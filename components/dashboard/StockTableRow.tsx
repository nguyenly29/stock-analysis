import { StockTableItem } from "@/types/StockTableItem";
import styles from "./StockTableRow.module.css";

interface StockTableRowProps {
    stock: StockTableItem;
}

export default function StockTableRow({
    stock,
}: StockTableRowProps) {

    return (
        <tr className={styles.row}>
            <td>{stock.ticker}</td>
            <td>{stock.companyName}</td>
            <td>{stock.currentPrice.toLocaleString()} VND</td>
            <td
                className={
                    stock.changePercent >= 0
                        ? styles.up
                        : styles.down
                }
            >
                {stock.changePercent > 0 ? "+" : ""}
                {stock.changePercent}%
            </td>
            <td>{stock.volume.toLocaleString()}</td>
            <td>
                {(stock.marketCap / 1_000_000_000).toFixed(1)} B
            </td>
            <td>
                <button className={styles.detailBtn}>
                    View
                </button>
            </td>
        </tr>
    );
}