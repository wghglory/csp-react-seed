import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error: any) {
        if (error.status === 404) return false;
        // retry once
        else if (failureCount < 1) return true;
        else return false;
      },
    },
  },
});

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export { AppProviders };
