import { notFound } from "next/navigation";
import { type ResolvingMetadata, type Metadata } from "next";
import { CurrentUserDocument, LanguageCodeEnum, ProductListByCategoryDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";

let user: {
	__typename?: "User";
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	languageCode: LanguageCodeEnum;
	avatar?: {
		__typename?: "Image";
		url: string;
		alt?: string | null;
	} | null;
} | null | undefined
export async function getCurrentUser() {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});
	return user;
}
export const generateMetadata = async (
	{ params }: { params: { slug: string; channel: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	user = await getCurrentUser()
	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: {
			slug: params.slug,
			channel: params.channel,
			languageCode: (user?.languageCode as LanguageCodeEnum) || LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	return {
		title: `${category?.name || "Categroy"} | ${category?.seoTitle || (await parent).title?.absolute}`,
		description: category?.seoDescription || category?.description || category?.seoTitle || category?.name,
	};
};

export default async function Page({ params }: { params: { slug: string; channel: string } }) {
	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: {
			slug: params.slug,
			channel: params.channel,
			languageCode: (user?.languageCode as LanguageCodeEnum) || LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!category || !category.products) {
		notFound();
	}

	const { name, products, translation } = category;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{translation?.name || name}</h1>
			<ProductList products={products.edges.map((e) => e.node)} />
		</div>
	);
}
