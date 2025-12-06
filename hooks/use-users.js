// ==================================================
// SWR HOOK - Dynamic user data fetching
// ==================================================

import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useUsers(role = null) {
  const url = role ? `/api/users?role=${role}` : "/api/users"

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    users: data?.users || [],
    isLoading,
    isError: error,
    mutate,
  }
}
