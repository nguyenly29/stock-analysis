import ListStocks from "@/components/stock/ListStocks";
import StockFooter from "@/components/stock/StockFooter";
import StockHeader from "@/components/stock/StockHeader";

export default function StockView(){
    return (
        <div>
            <StockHeader/>
            <ListStocks/>
            <StockFooter/>
        </div>
    )
}