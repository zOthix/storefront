import { type OrderFragment, useOrderQuery } from "@/checkout/graphql";
import { getQueryParams } from "@/checkout/lib/utils/url";
import { LanguageCodeEnum } from "@/gql/graphql";

export const useOrder = () => {
	const { orderId } = getQueryParams();

	const [{ data, fetching: loading }] = useOrderQuery({
		pause: !orderId,
		variables: { languageCode: LanguageCodeEnum.UrPk, id: orderId as string },
	});

	return { order: data?.order as OrderFragment, loading };
};
