"use client";

import MarketOverview from "@/components/dashboard/MarketOverview";
import StockTable from "@/components/dashboard/StockTable";
import SummarySection from "@/components/dashboard/SummarySection";
import { getSummary } from "@/services/dashboard.service";
import { DashboardSummary } from "@/types/DashboardSummary";
import { useEffect, useState } from "react";
import style from "./page.module.css"

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
                <SummarySection summary={summary} />
            )}
            <div className={style.content}>
                <div className={style.leftColumn}>
                    <MarketOverview />
                    <StockTable />
                </div>
                <div className={style.rightColumn}>
                    <div className={style.placeholder}>
                        Top Gainers
                    </div>
                    <div className={style.placeholder}>
                        Top Losers
                    </div>
                    <div className={style.placeholder}>
                        Top Volumn
                    </div>
                </div>
            </div>
        </div>
    )
}