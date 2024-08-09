import { notFound } from "next/navigation";
import { type Metadata } from "next";
import edjsHTML from "editorjs-html";
import xss from "xss";
import { CurrentUserDocument, LanguageCodeEnum, PageGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

const parser = edjsHTML();

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});
	const { page } = await executeGraphQL(PageGetBySlugDocument, {
		variables: {
			slug: params.slug,
			languageCode: (user?.languageCode as LanguageCodeEnum) || LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	return {
		title: `${page?.seoTitle || page?.title || "Page"} · Saleor Storefront example`,
		description: page?.seoDescription || page?.seoTitle || page?.title,
	};
};

export default async function Page({ params }: { params: { slug: string } }) {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});
	const { page } = await executeGraphQL(PageGetBySlugDocument, {
		variables: {
			slug: params.slug,
			languageCode: (user?.languageCode as LanguageCodeEnum) || LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!page) {
		notFound();
	}

	const { title, content, translation } = page;

	const contentHtml = content ? parser.parse(JSON.parse(content)) : null;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="text-3xl font-semibold">{translation?.title || title}</h1>
			{contentHtml && (
				<div className="prose">
					{contentHtml.map((content) => (
						<div key={content} dangerouslySetInnerHTML={{ __html: xss(translation?.content || content) }} />
					))}
				</div>
			)}
		</div>
	);
}
