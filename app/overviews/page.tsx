"use client";

import MarketOverview from "@/components/dashboard/MarketOverview";
import StockTable from "@/components/dashboard/StockTable";
import { useEffect, useState } from "react";
import style from "./page.module.css"
import MarketTicker from "@/components/dashboard/MarketTicker";
import MarketMovers from "@/components/dashboard/MarketMovers";
import { MarketIndexItem } from "@/types/MarketIndexItem";
import { getIndexes, } from "@/services/market.service";
import { StockDetail } from "@/types/StockDetail";
import { getStockDetail } from "@/services/stock.service";
import StockCandlestickChart from "@/components/dashboard/StockCandlestickChart";
import { X } from "lucide-react";

export default function Overview(){
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [indexes, setIndexes] = useState<MarketIndexItem[]>([]);
    const [stockDetail, setStockDetail] = useState<StockDetail | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
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

    useEffect(() => {
        if(!selectedTicker) return;
        const fetchDetail = async() => {
            setLoadingDetail(true);
            try {
                const detail = await getStockDetail(selectedTicker);
                setStockDetail(detail);
            } catch (error){
                console.error(error);
            } finally{
                setLoadingDetail(false);
            }
        };
        fetchDetail();
    }, [selectedTicker]);
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
                    <StockTable onView={(ticker)=>{setSelectedTicker(ticker)}} />
                </div>
                <div className={style.rightColumn}>
                    <div className={style.placeholder}>
                        <MarketMovers/>
                    </div>
                </div>
            </div>
            {selectedTicker && (
                <div className={style.overlay}>
                    <div className={style.popup}>
                        <button onClick={() => {setSelectedTicker(null); setStockDetail(null)}}>
                            <X/>
                        </button>
                        {loadingDetail ? (<p>Đang tải dữ liệu...</p>) : stockDetail && (
                            <>
                                <StockCandlestickChart 
                                    ticker={stockDetail.ticker}
                                    companyName={stockDetail.companyName}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}