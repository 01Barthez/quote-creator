// Compoment to implement lazy loading of the app 

import React, { lazy, Suspense } from 'react';
import LoaderPage from '@/layouts/loaders/LoaderPage';

interface DynamicPageLoaderProps {
    pageKey: string; // Key representing the page to load dynamically
}

// Dynamically import pages using import.meta.glob
const pages = import.meta.glob('/src/pages/**/*.tsx');

const DynamicPageLoader: React.FC<DynamicPageLoaderProps> = ({ pageKey }) => {
    console.log(`Loading page: ${pageKey}`);

    // Lazy load the page based on the provided pageKey 
    // @ts-ignore-next-line
    const PageComponent = lazy(() => {
        const importPage = pages[`/src/pages/${pageKey}.tsx`];

        if (!importPage) {
            console.error(`Page not found: ${pageKey}`);
            return Promise.reject(new Error(`Page not found: ${pageKey}`));
        }

        console.log("Corect import ");
        return importPage();
    });

    return (
        <Suspense fallback={<LoaderPage />}>
            <React.StrictMode>
                <PageComponent />
            </React.StrictMode>
        </Suspense>
    );
};

export default DynamicPageLoader;
