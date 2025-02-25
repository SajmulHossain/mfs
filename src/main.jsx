import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './context/AuthProvider.jsx'

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
    <AuthProvider>
        <RouterProvider router={routes} />
        <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
      </QueryClientProvider>
  </StrictMode>
);
