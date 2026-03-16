import useSWR from 'swr'
import { fetcher } from '../lib/api'

export function useBlogs(params = {}) {
  const query = new URLSearchParams(params).toString()
  const key = '/blogs' + (query ? '?' + query : '')
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
  return { blogs: data?.data || [], pagination: data?.pagination, isLoading, isError: !!error, error, mutate }
}

export function useBlog(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? '/blogs/' + id : null, fetcher, { revalidateOnFocus: false })
  return { blog: data?.blog, isLoading, isError: !!error, error, mutate }
}

export function useInquiries(params = {}) {
  const query = new URLSearchParams(params).toString()
  const key = '/inquiries' + (query ? '?' + query : '')
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    refreshInterval: 60000,
  })
  return { inquiries: data?.data || [], pagination: data?.pagination, isLoading, isError: !!error, error, mutate }
}

export function useInquiry(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? '/inquiries/' + id : null, fetcher, { revalidateOnFocus: false })
  return { inquiry: data?.inquiry, isLoading, isError: !!error, error, mutate }
}

export function useInquiryStats() {
  const { data, error, isLoading, mutate } = useSWR('/inquiries/stats', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  })
  return { stats: data?.stats, isLoading, isError: !!error, mutate }
}
