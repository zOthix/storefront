import Link from "next/link";
import { NavLink } from "./NavLink";
import { executeGraphQL } from "@/lib/graphql";
import { CurrentUserDocument, LanguageCodeEnum, MenuGetBySlugDocument } from "@/gql/graphql";

export const NavLinks = async ({ channel }: { channel: string }) => {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});

	const navLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: {
			slug: "navbar",
			channel,
			languageCode: (user?.languageCode as LanguageCodeEnum) || LanguageCodeEnum.En,
		},
		revalidate: 60 * 60 * 24,
	});

	return (
		<>
			<NavLink href="/products">All</NavLink>
			{navLinks.menu?.items?.map((item) => {
				if (item.category) {
					return (
						<NavLink key={item.id} href={`/categories/${item.category.slug}`}>
							{item?.translation?.name || item.category.name}
						</NavLink>
					);
				}
				if (item.collection) {
					return (
						<NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
							{item.collection.name}
						</NavLink>
					);
				}
				if (item.page) {
					return (
						<NavLink key={item.id} href={`/pages/${item.page.slug}`}>
							{item.page.title}
						</NavLink>
					);
				}
				if (item.url) {
					return (
						<Link key={item.id} href={item.url}>
							{item.name}
						</Link>
					);
				}
				return null;
			})}
		</>
	);
};
