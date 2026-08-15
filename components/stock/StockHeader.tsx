import { getRealtimeStocks } from "@/services/stock.service";
import styles from "./StockHeader.module.css";

export default async function StockHeader() {
    const stocks = await getRealtimeStocks();

    const totalStocks = stocks.length;
    const advancing = stocks.filter(
        stock => stock.changePercent > 0
    ).length;

    const declining = stocks.filter(
        stock => stock.changePercent < 0
    ).length;

    const totalVolume = stocks.reduce(
        (sum, stock) => sum + stock.volume,
        0
    );
    return (
        <section className={styles.header}>
            <div className={styles.left}>
                <div>
                    <h1 className={styles.title}>
                        THỊ TRƯỜNG CHỨNG KHOÁN
                    </h1>
                    <p className={styles.description}>
                        Khám phá tất cả các công ty niêm yết, giá thị trường và thông tin giao dịch.
                    </p>
        
                </div>
            </div>
            <div className={styles.right}>
                <p className={styles.totalItem}>Tổng số mã: {totalStocks}</p>
                <p className={styles.totalItem}>Số mã tăng: {advancing}</p>
                <p className={styles.totalItem}>Số mã giảm: {declining}</p>
                <p className={styles.totalItems}>Tổng khối lượng: {totalVolume}</p>
            </div>
        </section>
    );
}