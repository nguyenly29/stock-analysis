"use client";

import { useEffect, useState } from "react";
import { getRealtimeStocks, getStockDetail } from "@/services/stock.service";
import { RealtimePrice } from "@/types/RealtimePrice";
import styles from "./Watchlist.module.css";
import Link from "next/link";
import { Bookmark, Eye, Package2, TriangleAlert, Filter, X } from "lucide-react";
import { useWatchlist } from "@/hooks/Watchlist";
import { News } from "@/types/News";
import { getNews } from "@/services/New.service";
import StockCandlestickChart from "../dashboard/StockCandlestickChart";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [stocks, setStocks] = useState<RealtimePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Tinh toan cho phan trang 
  const totalItems = stocks.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = stocks.slice(startIndex, startIndex + pageSize);

  //Modal 
  const [selectedTicker, setSelectedTicker] = useState<String | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [stockDetail, setStockDetail] = useState<any>(null);
  // Click detail
  const handleOpenPopup =  async (ticker: string)=>{
    setSelectedTicker(ticker);
    setShowPopup(true);
    try {
      const detail = await getStockDetail(ticker);
      setStockDetail(detail);
    } catch(error: any) {
      console.error(error);
    }
  };
  // Close Popup
  const handleClosePopup = ()=> {
    setShowPopup(false);
    setSelectedTicker(null);
  }
  // 👉 Lấy danh sách category từ news
  const categories = ["all", ...new Set(news.map(item => item.category).filter(Boolean))];

  const getPageNumbers = () => {
    const total = totalPages;
    const current = currentPage;
    const maxVisible = 5;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);

    if (current <= 3) {
      start = 2;
      end = 4;
    }

    if (current >= total - 2) {
      start = total - 3;
      end = total - 1;
    }

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) {
      pages.push('...');
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

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
      setFilteredNews(res);
    } catch(error:any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 👉 Filter news theo category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, news]);

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

      <div className={styles.tableWrapper}>
        {/* Table */}
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.iconText}>
              <Bookmark/>
              <h1>My Watchlist</h1>
            </div>
            <span className={styles.count}>{stocks.length} items</span>
          </div>
          <table>
            <thead>
              <tr>
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
              {currentData.map((item) => (
                <tr key={item.ticker}>
                  <td className={styles.ticker}>{item.ticker}</td>
                  <td className={styles.companyName}>{item.companyName}</td>
                  <td className={styles.currentPrice}>{formatPrice(item.currentPrice)}</td>
                  <td
                    style={{
                      color: item.change >= 0 ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {item.change >= 0 ? "+" : ""}
                    {item.change}
                  </td>
                  <td
                    style={{
                      color: item.changePercent >= 0 ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {item.changePercent >= 0 ? "+" : ""}
                    {item.changePercent.toFixed(2)}%
                  </td>
                  <td className={styles.volume}>{formatNumber(item.volume)}</td>
                  <td className={styles.mktCap}>{formatNumber(item.marketCap)}</td>
                  <td>
                    {/* <Link href={`/stocks/${item.ticker}`} className={styles.viewBtn}>
                      Detail
                    </Link> */}
                    <button onClick={() => handleOpenPopup(item.ticker)} className={styles.viewBtn}>Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {totalItems > 0 && (
            <div className={styles.pagination}>
              <div className={styles.pageInfo}>
                Hiển thị {startIndex + 1} - {Math.min(startIndex + pageSize, totalItems)} trong tổng số {totalItems} cổ phiếu
              </div>
              <div className={styles.pageControls}>
                <button
                  className={styles.pageBtnL}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  &lt;
                </button>

                {getPageNumbers().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                      onClick={() => setCurrentPage(page as number)}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  className={styles.pageBtnR}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* News Column */}
        <div className={styles.column2}>
          <div className={styles.column2Header}>
            
            <span><Filter size={18} />Tin tức mới nhất</span>
            <div className={styles.filterWrapper}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.categoryFilter}
              >
                <option value="all">Tất cả</option>
                {categories.filter(c => c !== "all").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {selectedCategory !== "all" && (
                <button
                  className={styles.clearFilter}
                  onClick={() => setSelectedCategory("all")}
                  title="Xóa bộ lọc"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className={styles.news}>
            {filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <div className={styles.content} key={item.id}>
                  <div className={styles.image}>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={styles.newsImage}
                      />
                    ) : (
                      <div className={styles.noImg}>Not Found</div>
                    )}
                  </div>
                  <div className={styles.itemContent}>
                    <h1 className={styles.title}>{item.title}</h1>
                    {item.category && (
                      <span className={styles.categoryTag}>{item.category}</span>
                    )}
                    <i className={styles.summary}>{item.summary}</i>
                    <p className={styles.contentItem}>{item.content}</p>
                    {item.sourceUrl && (
                      <Link className={styles.source} href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                        Nguồn: <i style={{ color: '#3B82F6', textDecoration: 'underline' }}>{item.source}</i>
                      </Link>
                    )}
                    <p className={styles.publishedAt}>{new Date(item.publishedAt).toLocaleString("vi-VN")}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noNews}>
                <p>Không có tin tức cho danh mục này</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup chi tiết cổ phiếu */}
      {showPopup && selectedTicker && (
          <div className={styles.overlay} onClick={handleClosePopup}>
              <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.popupHeader}>
                      <button onClick={handleClosePopup} className={styles.closeBtn}>
                          <X size={20} />
                      </button>
                  </div>
                  <div className={styles.popupContent}>
                      {/* Ở đây bạn có thể tái sử dụng component InfoTab hoặc hiển thị thông tin */}
                      {stockDetail ? (
                        <StockCandlestickChart 
                          ticker={stockDetail.ticker}
                          companyName={stockDetail.companyName}
                        />
                      ) : (
                        <p>Đang tải dữ liệu...</p>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}