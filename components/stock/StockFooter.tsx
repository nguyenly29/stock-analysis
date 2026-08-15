'use client';

import { useRouter } from "next/navigation";
import styles from './StockFooter.module.css';
import { ArrowDownLeft, ArrowUpRight, ChartNoAxesCombined, TrendingUpDown } from "lucide-react";

export default function StockFooter() {
    // const router = useRouter();

    // const goBack = () => {
    //     router.push('/')
    // }
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Tin tức liên quan</h1>
            </div>
            <div className={styles.footer}>
                <div className={styles.boxItem}>
                    <div className={styles.itemTop}>
                        <h1>Top Gainers</h1>
                        <ArrowUpRight/>
                    </div>
                    <div className={styles.itemBottom}>
                        <p>Top giá tăng</p>
                    </div>
                </div>
                <div className={styles.boxItem}>
                    <div className={styles.itemTop}>
                        <h1>Top Losers</h1>
                        <ArrowDownLeft/>
                    </div>
                    <div className={styles.itemBottom}>
                        <p>Top giá giảm</p>
                    </div>
                </div>
                <div className={styles.boxItem}>
                    <div className={styles.itemTop}>
                        <h1>Trending</h1>
                        <TrendingUpDown/>
                    </div>
                    <div className={styles.itemBottom}>
                        <p>Biến động thị trường</p>
                    </div>
                </div>
                <div className={styles.boxItem}>
                    <div className={styles.itemTop}>
                        <h1>Top Stocks</h1>
                        <ChartNoAxesCombined/>
                    </div>
                    <div className={styles.itemBottom}>
                        <p>Top cổ phiếu</p>
                    </div>
                </div>
            </div>
        </div>
    )
}