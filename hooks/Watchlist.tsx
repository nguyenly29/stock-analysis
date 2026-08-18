'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WatchlistProps {
    watchlist:string[];
    toggleWatchlist: (ticker:string) => void;
    isInWatchlist: (ticker:string) => boolean;
}

const WatchlistContext = createContext<WatchlistProps | undefined>(undefined);

const STORAGE_KEY = 'watchlist';

export function WatchlistProvider ({children}: {children: ReactNode}){
    const [watchlist, setWatchlist] = useState<string[]>([]);
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if(stored) {
            try {
                setWatchlist(JSON.parse(stored));
            } catch {
                setWatchlist([]);
            }
        }
    }, []);

    // Luu vao LocalStorage moi khi watchlist thay doi
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    }), [watchlist];

    // Them xoa ticker khoi watchlist 
    const toggleWatchlist = (ticker: string) => {
        setWatchlist((prev) => prev.includes(ticker) ? prev.filter((t) => t !== ticker) : [...prev, ticker]);
    };

    // Kiem tra da co trong WL chua
    const isInWatchlist = (ticker: string) => watchlist.includes(ticker);
    return (
        <WatchlistContext.Provider value = {{ watchlist, toggleWatchlist, isInWatchlist}}>
            {children}
        </WatchlistContext.Provider>
    );
}

// Hook de cac component khac dung
export function useWatchlist () {
    const context = useContext(WatchlistContext);
    if(!context) {
        throw new Error("useWatchlist must be used within a WatchlistProvider");
    }
    return context;
}