import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { isSupabaseError } from './data/error/errorHandlers.ts'
import { toast } from 'react-toastify'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isSupabaseError(error)) {
        toast.error(error.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (isSupabaseError(error)) {
        toast.error(error.message);
      }
    }
  })
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
