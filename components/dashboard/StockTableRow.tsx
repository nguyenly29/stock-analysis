import Link from "next/link";
import styles from "./StockTableRow.module.css";
import { RealtimePrice } from "@/types/RealtimePrice";

interface StockTableRowProps {
    stock: RealtimePrice;
}

export default function StockTableRow({
    stock,
}: StockTableRowProps) {
    return (
        <tr className={styles.row}>
            <td>{stock.ticker}</td>

            <td>{stock.companyName}</td>

            <td>
                {stock.currentPrice.toLocaleString("vi-VN")} VND
            </td>

            <td
                className={
                    stock.changePercent >= 0
                        ? styles.up
                        : styles.down
                }
            >
                {stock.change > 0 ? "+" : ""}
                {stock.change.toFixed(2)}
                {" ("}
                {stock.changePercent > 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%)
            </td>

            <td>
                {stock.volume.toLocaleString("vi-VN")}
            </td>

            <td>
                {(stock.marketCap / 1_000_000_000).toLocaleString("vi-VN", {
                    maximumFractionDigits: 1,
                })}{" "}
                B
            </td>

            <td>
                <Link href={`/stocks/${stock.ticker}`} className={styles.detailBtn}>
                    View
                </Link>
            </td>
        </tr>
    );
}