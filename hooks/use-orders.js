// ==================================================
// SWR HOOK - Dynamic order data fetching
// ==================================================

import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useOrders(filters = {}) {
  const params = new URLSearchParams()
  if (filters.userId) params.set("userId", filters.userId)
  if (filters.sellerId) params.set("sellerId", filters.sellerId)

  const queryString = params.toString()
  const url = `/api/orders${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    orders: data?.orders || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useOrder(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? `/api/orders/${id}` : null, fetcher)

  return {
    order: data?.order,
    isLoading,
    isError: error,
    mutate,
  }
}
