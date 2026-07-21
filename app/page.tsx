"use client";

import MarketOverview from "@/components/dashboard/MarketOverview";
import StockTable from "@/components/dashboard/StockTable";
import { getSummary } from "@/services/dashboard.service";
import { DashboardSummary } from "@/types/DashboardSummary";
import { useEffect, useState } from "react";
import style from "./page.module.css"
import MarketTicker from "@/components/dashboard/MarketTicker";
import MarketMovers from "@/components/dashboard/MarketMovers";

export default function OverView(){
    const [summary, setSummary] = useState<DashboardSummary | null>();
    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await getSummary();
                setSummary(data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])
    return(
        <div className={style.dashboard}>
            {summary && (
                <MarketTicker summary={summary} />
            )}
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