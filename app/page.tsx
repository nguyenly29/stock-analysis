"use client";

import MarketOverview from "@/components/dashboard/MarketOverview";
import StockTable from "@/components/dashboard/StockTable";
import { useEffect, useState } from "react";
import style from "./page.module.css"
import MarketTicker from "@/components/dashboard/MarketTicker";
import MarketMovers from "@/components/dashboard/MarketMovers";
import { MarketIndexItem } from "@/types/MarketIndexItem";
import { getIndexes, } from "@/services/market.service";

export default function OverView(){
    const [indexes, setIndexes] = useState<MarketIndexItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIndexes();
                setIndexes(data);
            } catch (error){
                console.error(error);
            }
        }
        fetchData();
    }, []);
    return(
        <div className={style.dashboard}>
            <div className={style.indexes}>
                {indexes &&(
                    <MarketTicker indexes={indexes} />
                )}
            </div>
            <div className={style.content}>
                <div className={style.leftColumn}>
                    <MarketOverview />
                    <StockTable />
                </div>
                <div className={style.rightColumn}>
                    <div className={style.placeholder}>
                        <MarketMovers/>
                    </div>
                </div>
            </div>
        </div>
    )
}