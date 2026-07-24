import StockDetailHeader from "@/components/stock/StockDetailHeader";
import StockHistoryChart from "@/components/stock/StockHistoryChart";
import StockPriceCard from "@/components/stock/StockPriceCard";
import { getStockDetail } from "@/services/stock.service";

interface StockDetailPageProps {
    params: Promise<{
        ticker: string;
    }>;
}

export default async function StockDetailPage({params}: StockDetailPageProps){
    const {ticker} = await params;
    const detail = await getStockDetail(ticker);
    return (
        <div>
            <StockDetailHeader detail={detail}/>
            <StockPriceCard detail={detail}/>
            <StockHistoryChart
                ticker={detail.ticker}
                change={detail.change}
                companyName={detail.companyName}
            />
        </div>
    )
}