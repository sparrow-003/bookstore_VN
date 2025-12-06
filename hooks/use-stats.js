// ==================================================
// SWR HOOK - Dynamic stats data fetching
// ==================================================

import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useStats(type = "admin", sellerId = null) {
  const params = new URLSearchParams()
  if (type === "seller" && sellerId) {
    params.set("type", "seller")
    params.set("sellerId", sellerId)
  }

  const queryString = params.toString()
  const url = `/api/stats${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  return {
    stats: data?.stats,
    isLoading,
    isError: error,
    mutate,
  }
}
