import { DashboardSummary } from "@/types/DashboardSummary";
import styles from "./SummarySection.module.css";

interface SummarySectionProps {
    summary: DashboardSummary;
}

export default function SummarySection({ summary }: SummarySectionProps) {
    return (
        <section className={styles.container}>

            <div className={styles.header}>
                <h2>Market Summary</h2>
            </div>

            <div className={styles.stats}>

                <div className={styles.item}>
                    <span className={styles.label}>Market Cap</span>
                    <span className={styles.value}>
                        {summary.totalMarketCap.toLocaleString()}
                    </span>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>Listed</span>
                    <span className={styles.value}>
                        {summary.totalStocks}
                    </span>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>Advancers</span>
                    <span className={styles.valueGreen}>
                        {summary.gainers}
                    </span>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>Decliners</span>
                    <span className={styles.valueRed}>
                        {summary.losers}
                    </span>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>Volume</span>
                    <span className={styles.value}>
                        {summary.totalVolume.toLocaleString()}
                    </span>
                </div>

            </div>

        </section>
    );
}