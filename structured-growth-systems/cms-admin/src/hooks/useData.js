import useSWR from 'swr'
import { fetcher } from '../lib/api'

export function useBlogs(params = {}) {
  const query = new URLSearchParams(params).toString()
  const key = 'blogs' + (query ? '?' + query : '')
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
  return { blogs: data?.data || [], pagination: data?.pagination, isLoading, isError: !!error, error, mutate }
}

export function useBlog(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? 'blogs/' + id : null, fetcher, { revalidateOnFocus: false })
  return { blog: data?.blog, isLoading, isError: !!error, error, mutate }
}

export function useInquiries(params = {}) {
  const query = new URLSearchParams(params).toString()
  const key = 'inquiries' + (query ? '?' + query : '')
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    refreshInterval: 60000,
  })
  return { inquiries: data?.data || [], pagination: data?.pagination, isLoading, isError: !!error, error, mutate }
}

export function useInquiry(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? 'inquiries/' + id : null, fetcher, { revalidateOnFocus: false })
  return { inquiry: data?.inquiry, isLoading, isError: !!error, error, mutate }
}

export function useInquiryStats() {
  const { data, error, isLoading, mutate } = useSWR('inquiries/stats', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  })
  return { stats: data?.stats, isLoading, isError: !!error, mutate }
}

export function useDashboardStats(params = {}) {
  const query = new URLSearchParams(params).toString()
  const key = 'stats' + (query ? '?' + query : '')
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  })
  return { stats: data?.stats, isLoading, isError: !!error, mutate }
}

export function useEmployees(params = {}) {
  const query = new URLSearchParams(params).toString()
  const key = 'employees' + (query ? '?' + query : '')
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
  return { 
    employees: data?.data || [], 
    pagination: data?.pagination, 
    isLoading, 
    isError: !!error, 
    error, 
    mutate 
  }
}

export function useEmployee(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? 'employees/' + id : null, fetcher, { revalidateOnFocus: false })
  return { employee: data?.employee, isLoading, isError: !!error, error, mutate }
}

export function useLeads(params = {}) {
  const query = new URLSearchParams(params).toString()
  const key = 'leads' + (query ? '?' + query : '')
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
  return { 
    leads: data?.data || [], 
    pagination: data?.pagination, 
    isLoading, 
    isError: !!error, 
    error, 
    mutate 
  }
}

export function useLead(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? 'leads/' + id : null, fetcher, { revalidateOnFocus: false })
  return { lead: data?.lead, isLoading, isError: !!error, error, mutate }
}

export function useClients(params = {}) {
  const query = new URLSearchParams(params).toString()
  const key = 'clients' + (query ? '?' + query : '')
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
  return { 
    clients: data?.data || [], 
    pagination: data?.pagination, 
    isLoading, 
    isError: !!error, 
    error, 
    mutate 
  }
}

export function useClient(id) {
  const { data, error, isLoading, mutate } = useSWR(id ? 'clients/' + id : null, fetcher, { revalidateOnFocus: false })
  return { client: data?.client, isLoading, isError: !!error, error, mutate }
}

