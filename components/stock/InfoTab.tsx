import { getStockDetail } from "@/services/stock.service";
import { StockDetail } from "@/types/StockDetail";
import { useEffect, useState } from "react";
import styles from './InfoTab.module.css';

interface InfoTabProps {
    ticker: string;
};

export default function InfoTab({ticker}: InfoTabProps) {
    const [stockInfo, setStockInfo] = useState<StockDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStockInfo = async () => {
        try {
            const res = await getStockDetail(ticker);
            setStockInfo(res);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(ticker) {
            fetchStockInfo();
        }
    }, [ticker]);

    if(loading) {
        return (
            <div className={styles.loading}>Đang tải dữ liệu...</div>
        )
    }
    return(
        <div className={styles.container}>
            {stockInfo && (
                <div className={styles.title}>
                    <h1>{stockInfo.ticker}-</h1>
                    <p>{stockInfo.companyName}</p>
                </div>
            )}
            <div className={styles.table}>
                <h1>Thông tin cơ bản</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Tên công ty</th>
                            <th>Mã</th>
                            <th>Ngành</th>
                            <th>VĐL (Tỷ)</th>
                            <th>Tỷ lệ nắm giữ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{stockInfo?.companyName}</td>
                            <td>{stockInfo?.ticker}</td>
                            <td>{stockInfo?.sector}</td>
                            <td>0.0</td>
                            <td>100.00%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.content}>
                <p>Website: {stockInfo?.website}</p>
                <p>{stockInfo?.description}</p>
            </div>
        </div>
    );
}