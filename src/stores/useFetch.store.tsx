import { create } from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';
import type { FetchState } from '@/interface/interface';
import OfflineAlert from '../components/custom/utils/OfflineAlert';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetchStore = create<FetchState<any>>()(
    devtools((set) => ({
        data: null,
        loading: false,
        error: null,

        fetchData: async (url: string) => {
            set({ loading: true, error: null });

            try {
                const response = await axios.get(url);
                set({ data: response.data });
            } catch (error) {
                // check if user is not connected and throw error 
                if (!navigator.onLine) {
                    <OfflineAlert />
                } else {
                    // Navigate user to internal server url...

                }

                // throw an error message to user...
                const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
                set({ error: errorMessage });

                throw new Error("Fetch Error: "+ errorMessage);
            } finally {
                set({ loading: false });
            }
        },
    }))
);