'use client';

import { useWatchlist } from '@/hooks/Watchlist';
import styles from './WatchlistButton.module.css';
import { useState } from 'react';
import { Bookmark } from 'lucide-react';

interface WatchlistButtonProps {
    ticker:string,
};

export default function WatchlistButton({ticker}: WatchlistButtonProps){
    const {isInWatchlist, toggleWatchlist} = useWatchlist();
    const [isAnimating, setIsAnimating] = useState(false);
    const inWatchlist = isInWatchlist(ticker);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleWatchlist(ticker);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <button 
        onClick={handleClick}
        className={`${styles.watchlistBtn} ${inWatchlist ? styles.active : ""} ${isAnimating ? styles.animate : ""}`}
        aria-label={inWatchlist ? "Xóa khỏi Watchlist" : "Thêm vào Watchlist"}
        title={inWatchlist ? "Xóa khỏi Watchlist" : "Thêm vào Wacthlist"}
        >
            <Bookmark size={20} fill={inWatchlist ? "currentColor" : "none"}/>
        </button>
    )
}