"use client";

import { useEffect, useState } from "react";
import { getRealtimeStocks } from "@/services/stock.service";
import { RealtimePrice } from "@/types/RealtimePrice";
import styles from "./Watchlist.module.css";
import Link from "next/link";
import { Bookmark, Eye, Package2, TriangleAlert } from "lucide-react";
import { useWatchlist } from "@/hooks/Watchlist";
import { News } from "@/types/News";
import { getNews } from "@/services/New.service";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const [news, setNews] = useState<News[]>([]);
  const [stocks, setStocks] = useState<RealtimePrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (watchlist.length === 0) {
      setLoading(false);
      return;
    }

    const fetchWatchlistData = async () => {
      try {
        const allStocks = await getRealtimeStocks();
        const filtered = allStocks.filter((stock) =>
          watchlist.includes(stock.ticker)
        );
        setStocks(filtered);
      } catch (error) {
        console.error("Lỗi khi tải watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistData();
  }, [watchlist]);

  const fetchNews = async() => {
    try {
      const res = await getNews();
      setNews(res);
    } catch(error:any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Format số
  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toString();
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "₫";
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Đang tải danh sách theo dõi...</p>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2><Package2/> Watchlist trống</h2>
        <p>Bạn chưa thêm cổ phiếu nào vào danh sách theo dõi.</p>
        <p>
          <Link href="/stockviews" className={styles.link}>
            → Đến trang cổ phiếu để thêm
          </Link>
        </p>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>Không tìm thấy dữ liệu</h2>
        <p>Có thể các cổ phiếu trong watchlist chưa có dữ liệu realtime.</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryBtn}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconText}>
          <Bookmark/>
          <h1>My Watchlist</h1>
        </div>
        <span className={styles.count}>{stocks.length} items</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {/* <th>STT</th> */}
              <th>Mã</th>
              <th>Công ty</th>
              <th>Giá</th>
              <th>Thay đổi</th>
              <th>% Thay đổi</th>
              <th>Khối lượng</th>
              <th>Vốn hóa</th>
              <th>Xem</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((item, index) => (
              <tr key={item.ticker}>
                {/* <td>{index + 1}</td> */}
                <td className={styles.ticker}>{item.ticker}</td>
                <td className={styles.companyName}>{item.companyName}</td>
                <td className={styles.currentPrice}>{formatPrice(item.currentPrice)}</td>
                <td
                  style={{
                    color: item.change >= 0 ? "#38a169" : "#e53e3e",
                  }}
                >
                  {item.change >= 0 ? "+" : ""}
                  {item.change}
                </td>
                <td
                  style={{
                    color: item.changePercent >= 0 ? "#38a169" : "#e53e3e",
                  }}
                >
                  {item.changePercent >= 0 ? "+" : ""}
                  {item.changePercent.toFixed(2)}%
                </td>
                <td className={styles.volume}>{formatNumber(item.volume)}</td>
                <td className={styles.mktCap}>{formatNumber(item.marketCap)}</td>
                <td>
                  <Link href={`/stocks/${item.ticker}`} className={styles.viewBtn}>
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.column2}>
          <div className={styles.news}>
            {news.map((item) => (
                <div className={styles.content} key={item.id}>
                    <div className={styles.image}>
                        {item.imageUrl ? (
                            <img
                            src={item.imageUrl}
                            alt={item.title}
                            className={styles.newsImage}
                            />
                        ) : (<div className={styles.noImg}>Not Found</div>)}
                    </div>
                    <div className={styles.itemContent}>
                        <h1 className={styles.title}>{item.title}</h1>
                        <i className={styles.summary}>{item.summary}</i>
                        <p className={styles.contentItem}>{item.content}</p>
                        {item.sourceUrl && (
                            <Link className={styles.source} href={item.sourceUrl} target="_blank" rel='nooper noreferrer' >
                                Nguồn: <i style={{color:'#3B82F6', textDecoration:'underline'}}>{item.source}</i>
                            </Link>
                        )}
                        <p className={styles.publishedAt}>{new Date(item.publishedAt).toLocaleString("vi-VN")}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}