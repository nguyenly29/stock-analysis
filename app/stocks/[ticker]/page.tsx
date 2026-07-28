import StockCandlestickChart from "@/components/dashboard/StockCandlestickChart";
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
            <StockCandlestickChart
                ticker={detail.ticker}
                companyName={detail.companyName}
            />
        </div>
    )
}