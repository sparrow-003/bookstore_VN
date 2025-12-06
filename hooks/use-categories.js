// ==================================================
// SWR HOOK - Dynamic category data fetching
// ==================================================

import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useCategories() {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher, {
    revalidateOnFocus: false,
  })

  return {
    categories: data?.categories || [],
    isLoading,
    isError: error,
  }
}
