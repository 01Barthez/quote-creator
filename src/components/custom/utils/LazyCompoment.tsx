// Compoment to implement lazy loading of the app 

import React, { lazy, Suspense } from 'react';
import LoaderPage from '@/layouts/loaders/LoaderPage';

interface DynamicPageLoaderProps {
    pageKey: string; // Key representing the page to load dynamically
}

// Dynamically import pages using import.meta.glob
const pages = import.meta.glob('/src/pages/**/*.tsx');

const DynamicPageLoader: React.FC<DynamicPageLoaderProps> = ({ pageKey }) => {
    // Lazy load the page based on the provided pageKey 
    // @ts-ignore-next-line
    const PageComponent = lazy(() => {
        const importPage = pages[`/src/pages/${pageKey}.tsx`];
        if (!importPage) {
            return Promise.reject(new Error(`Page not found: ${pageKey}`));
        }
        return importPage();
    });

    return (
        <Suspense fallback={<LoaderPage />}>
                <PageComponent />
        </Suspense>
    );
};

export default DynamicPageLoader;
