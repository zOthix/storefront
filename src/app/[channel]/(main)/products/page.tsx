import { notFound } from "next/navigation";
import { CurrentUserDocument, LanguageCodeEnum, ProductListPaginatedDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { Pagination } from "@/ui/components/Pagination";
import { ProductList } from "@/ui/components/ProductList";
import { ProductsPerPage } from "@/app/config";

export const metadata = {
	title: "Products · Saleor Storefront example",
	description: "All products in Saleor Storefront example",
};

export default async function Page({
	params,
	searchParams,
}: {
	params: { channel: string };
	searchParams: {
		cursor: string | string[] | undefined;
	};
}) {
	const cursor = typeof searchParams.cursor === "string" ? searchParams.cursor : null;
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});
	const { products } = await executeGraphQL(ProductListPaginatedDocument, {
		variables: {
			first: ProductsPerPage,
			after: cursor,
			channel: params.channel,
			languageCode: (user?.languageCode as LanguageCodeEnum) || LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	const newSearchParams = new URLSearchParams({
		...(products.pageInfo.endCursor && { cursor: products.pageInfo.endCursor }),
	});

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products.edges.map((e) => e.node)} />
			<Pagination
				pageInfo={{
					...products.pageInfo,
					basePathname: `/products`,
					urlSearchParams: newSearchParams,
				}}
			/>
		</section>
	);
}
