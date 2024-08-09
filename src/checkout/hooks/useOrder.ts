import { type OrderFragment, useOrderQuery } from "@/checkout/graphql";
import { getQueryParams } from "@/checkout/lib/utils/url";
import { CurrentUserDocument, type LanguageCodeEnum } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export const useOrder = async () => {
	const { orderId } = getQueryParams();
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});
	const [{ data, fetching: loading }] = useOrderQuery({
		pause: !orderId,
		variables: {
			languageCode: (user?.languageCode as LanguageCodeEnum) || LanguageCodeEnum.En,
			id: orderId as string,
		},
	});

	return { order: data?.order as OrderFragment, loading };
};
