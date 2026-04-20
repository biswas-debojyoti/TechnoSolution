import { Routes, Route, Navigate } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider } from './context/ThemeContext'
import { fetcher } from './lib/api'

import ProtectedRoute from './components/auth/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'

import LoginPage       from './pages/LoginPage'
import DashboardPage   from './pages/DashboardPage'
import BlogsPage       from './pages/BlogsPage'
import BlogFormPage    from './pages/BlogFormPage'
import InquiriesPage   from './pages/InquiriesPage'
import EmployeesPage   from './pages/EmployeesPage'
import EmployeeFormPage from './pages/EmployeeFormPage'
import LeadsPage from './pages/LeadsPage'
import ClientsPage from './pages/ClientsPage'
import ClientDetailPage from './pages/ClientDetailPage'
import EntityFormPage from './pages/EntityFormPage'


const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  errorRetryCount: 1,
  onError: (err) => {
    // 401 is handled by axios interceptor — swallow here
    if (err?.response?.status === 401) return
    console.error('[SWR]', err?.response?.data?.message || err.message)
  },
}

export default function App() {
  return (
    <SWRConfig value={swrConfig}>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <Routes>
              {/* Public */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/"                  element={<DashboardPage />} />
                  <Route path="/blogs"             element={<BlogsPage />} />
                  <Route path="/blogs/new"         element={<BlogFormPage />} />
                  <Route path="/blogs/:id/edit"    element={<BlogFormPage />} />
                  <Route path="/inquiries"         element={<InquiriesPage />} />
                  <Route path="/employees"         element={<EmployeesPage />} />
                  <Route path="/employees/new"     element={<EmployeeFormPage />} />
                  <Route path="/employees/:id/edit" element={<EmployeeFormPage />} />
                  <Route path="/leads"             element={<LeadsPage />} />
                  <Route path="/leads/new"         element={<EntityFormPage />} />
                  <Route path="/leads/:id/edit"    element={<EntityFormPage />} />
                  <Route path="/clients"           element={<ClientsPage />} />
                  <Route path="/clients/:id"      element={<ClientDetailPage />} />
                  <Route path="/clients/:id/edit"  element={<EntityFormPage />} />

                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
