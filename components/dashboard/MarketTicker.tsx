import { DashboardSummary } from "@/types/DashboardSummary";
import styles from "./MarketTicker.module.css";
import { mockMarketIndex } from "@/data/mock-market-index";

interface Props {
    summary: DashboardSummary;
}

export default function SummarySection({ summary }: Props) {
    return (
        <section className={styles.container}>
            {mockMarketIndex.map((item, index) => (
                <div key={item.symbol} className={styles.item}>

                    <span className={styles.symbol}>
                        {item.symbol}
                    </span>

                    <span className={styles.value}>
                        {item.value.toLocaleString()}
                    </span>

                    <span
                        className={
                            item.change >= 0
                                ? styles.up
                                : styles.down
                        }
                    >
                        {item.change >= 0 ? "▲" : "▼"}
                        {" "}
                        {Math.abs(item.changePercent)}%
                    </span>

                    {/* {index !== mockMarketIndex.length - 1 && (
                        <span className={styles.separator}>|</span>
                    )} */}

                </div>
            ))}
            <div className={styles.item}>
                <span className={styles.symbol}>LISTED</span>
                <span className={styles.value}>{summary.totalStocks}</span>
                {/* <span className={styles.separator}>|</span> */}
            </div>

            <div className={styles.item}>
                <span className={styles.symbol}>ADV</span>
                <span className={styles.up}>{summary.gainers}</span>
                {/* <span className={styles.separator}>|</span> */}
            </div>

            <div className={styles.item}>
                <span className={styles.symbol}>DEC</span>
                <span className={styles.down}>{summary.losers}</span>
                {/* <span className={styles.separator}>|</span> */}
            </div>

            <div className={styles.item}>
                <span className={styles.symbol}>MKT CAP</span>
                <span className={styles.value}>
                    {summary.totalMarketCap.toLocaleString()}
                </span>
            </div>
        </section>
    );
}