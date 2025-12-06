// ==================================================
// SWR HOOK - Dynamic book data fetching
// ==================================================

import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useBooks(filters = {}) {
  const params = new URLSearchParams()
  if (filters.category) params.set("category", filters.category)
  if (filters.search) params.set("search", filters.search)
  if (filters.sortBy) params.set("sortBy", filters.sortBy)
  if (filters.featured) params.set("featured", "true")
  if (filters.sellerId) params.set("sellerId", filters.sellerId)

  const queryString = params.toString()
  const url = `/api/books${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    books: data?.books || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useBook(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? `/api/books/${id}` : null, fetcher)

  return {
    book: data?.book,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useFeaturedBooks() {
  return useBooks({ featured: true })
}
