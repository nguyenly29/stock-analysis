import styles from "./StockPriceCard.module.css";
import { StockDetail } from "@/types/StockDetail";

interface StockPriceCardProps {
    detail: StockDetail;
}

export default function StockPriceCard({
    detail,
}: StockPriceCardProps) {

    const isUp = detail.change >= 0;

    return (
        <section className={styles.card}>

            <div className={styles.left}>

                <div className={styles.price}>
                    {detail.currentPrice.toLocaleString()} VND
                </div>

                <div
                    className={
                        isUp
                            ? styles.up
                            : styles.down
                    }
                >
                    {isUp ? "▲" : "▼"}

                    {" "}

                    {Math.abs(detail.change).toLocaleString()}

                    {" ("}

                    {Math.abs(detail.changePercent)}%

                    {")"}
                </div>

            </div>

            <div className={styles.right}>

                <div className={styles.item}>
                    <span>Open</span>
                    <strong>
                        {detail.openPrice.toLocaleString()}
                    </strong>
                </div>

                <div className={styles.item}>
                    <span>Previous Close</span>
                    <strong>
                        {detail.previousClose.toLocaleString()}
                    </strong>
                </div>

                <div className={styles.item}>
                    <span>Volume</span>
                    <strong>
                        {detail.volume.toLocaleString()}
                    </strong>
                </div>

            </div>

        </section>
    );
}