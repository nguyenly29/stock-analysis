import style from "./TooltipStockHistory.module.css";

interface StockHistoryTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

export default function TooltipStockHistory({active, payload, label}: StockHistoryTooltipProps) {
    if(!active || !payload || payload.length === 0) {
        return null;
    }

    const data = payload[0].payload;
    return(
        <div className={style.container}>
            <div className={style.item}>
                <span className={style.label}>Open</span>
                <span className={style.value}>
                    {data?.open?.toLocaleString() ?? "--"}
                </span>
            </div>

            <div className={style.item}>
                <span className={style.label}>High</span>
                <span className={style.value}>
                    {data?.high?.toLocaleString() ?? "--"}
                </span>
            </div>

            <div className={style.item}>
                <span className={style.label}>Low</span>
                <span className={style.value}>
                    {data?.low?.toLocaleString() ?? "--"}
                </span>
            </div>

            <div className={style.item}>
                <span className={style.label}>Close</span>
                <span className={style.value}>
                    {data?.close?.toLocaleString() ?? "--"}
                </span>
            </div>

            <div className={style.volume}>
                <span className={style.label}>Volume</span>
                <span className={style.value}>
                    {data?.volume?.toLocaleString() ?? "--"}
                </span>
            </div>
        </div>
    )
}