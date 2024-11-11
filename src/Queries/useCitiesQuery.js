import { useQuery } from 'react-query';

import { useQueryClient } from 'react-query';

export const useGetFetchedQuery = (name) => {
	const queryClient = useQueryClient();

	return queryClient.getQueryData(name);
};
