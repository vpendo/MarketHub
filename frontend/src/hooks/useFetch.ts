import { useQuery } from "@tanstack/react-query";
import type {
  DefaultError,
  QueryKey,
  UseQueryOptions,
} from "@tanstack/react-query";

type FetchOptions<TData, TQueryKey extends QueryKey> = Omit<
  UseQueryOptions<TData, DefaultError, TData, TQueryKey>,
  "queryKey" | "queryFn"
> & {
  onSuccess?: (data: TData) => void;
};

export default function useFetch<TData, TQueryKey extends QueryKey = QueryKey>(
  key: TQueryKey,
  fn: () => Promise<TData>,
  options?: FetchOptions<TData, TQueryKey>
) {
  return useQuery<TData, DefaultError, TData, TQueryKey>({
    queryKey: key,
    queryFn: fn,
    staleTime: 1000 * 60,
    ...options,
  });
}
