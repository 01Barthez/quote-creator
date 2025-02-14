import React from 'react'
import Router from '@/routes/router'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/hooks/use-theme';
import ScrollProgressBar from '@/components/custom/utils/ScrollProgress'
import OfflineAlert from '@/components/custom/utils/OfflineAlert';


const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ScrollProgressBar />
      <RouterProvider router={Router} />
      
      <Toaster />
      <OfflineAlert />
    </ThemeProvider>
  )
}

export default App
