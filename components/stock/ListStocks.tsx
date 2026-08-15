'use client';

import { RealtimePrice } from '@/types/RealtimePrice';
import styles from './ListStocks.module.css';
import { useEffect, useState } from 'react';
import { getRealtimeStocks, getStockDetail } from '@/services/stock.service';
import { ChevronLeft, ChevronRight, RefreshCw, Search, X } from 'lucide-react';
import { StockDetail } from '@/types/StockDetail';
import CandlestickChartTab from './CandlestickChartTab';
import InfoTab from './InfoTab';

interface StockTabs {
    detail: StockDetail;
    onClose: () => void;
}

type Tab = 'profile' | 'chart' | 'new';

export default function ListStocks({detail, onClose}: StockTabs) {
    const [listStocks, setListStocks] = useState<RealtimePrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStocks, setFilteredStocks] = useState<RealtimePrice[]>([]);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [stockDetail, setStockDetail] = useState<StockDetail | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('chart');

    const fetchListStocks = async () => {
        try {
            const data = await getRealtimeStocks();
            setListStocks(data);
            setFilteredStocks(data);
            setLastUpdate(new Date());
        } catch(err: any) {
            console.error('Xảy ra lỗi!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListStocks();
    }, []);

    useEffect(() => {
        if(!selectedTicker) return;
        const fetchDetail = async() => {
            setDetailLoading(true);
            try {
                const detail = await getStockDetail(selectedTicker);
                setStockDetail(detail);
            } catch (err: unknown) {
                console.error(err);
            } finally {
                setDetailLoading(false);
            }
        };
        fetchDetail();
    }, [selectedTicker])

    // Tính toán phân trang
    const totalItems = filteredStocks.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredStocks.slice(startIndex, endIndex);

    // Chuyển trang
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Change items per page
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset về trang 1
    };

    // cau hinh cho phan tien
    const formatNumber = (num: number) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toString();
    };

    // cau hinh don vi tien VND
    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN') + '₫';
    };

    // dieu huong trang
    const handleViewDetail = (ticker: string) => {
        setSelectedTicker(ticker);
    };

    // refresh
    const handleRefresh = async() => {
        await fetchListStocks();
    }

    // Search 
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Neu search trong hien thi tat ca
        if(!value.trim()) {
            setFilteredStocks(listStocks);
            setCurrentPage(1);
            return;
        }
        const filtered = listStocks.filter(item => 
            item.ticker.toLowerCase().includes(value.toLowerCase()) ||
            item.companyName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredStocks(filtered);
        setCurrentPage(1);
    }
    // thong bao khong tim thay
    const showNoResults = searchTerm && filteredStocks.length === 0 && !loading;

    // Format thời gian
    const formatTime = (date: Date) => {
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    return (
        <div className={styles.container}>

            {/* Title */}
            <div className={styles.title}>
                <div className={styles.leftAction}>
                    {/* Search */}
                    <div className={styles.search}>
                        <Search size={15}/>
                        <input type='text' placeholder='Search filters...' value={searchTerm} onChange={handleSearch}/>
                        {searchTerm && (
                            <button 
                                className={styles.clearSearch}
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilteredStocks(listStocks);
                                    setCurrentPage(1);
                                }}
                            >
                                <X size={16}/>
                            </button>
                        )}
                    </div>
                    {/* Refresh */}
                    <div className={styles.refresh}>
                        <button className={styles.refreshBtn} onClick={handleRefresh} disabled={loading}>{loading ? 'Đang tải...' : <RefreshCw size={15}/>}</button>
                    </div>
                </div>
                {/* LastUpdate */}
                <div className={styles.rightAction}>
                    {lastUpdate && (
                        <span className={styles.lastUpdate}>Last update: {formatTime(lastUpdate)}</span>
                    )}
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className={styles.loading}>
                    <h1>Đang tải dữ liệu...</h1>
                </div>
            )}

            {!loading && showNoResults && (
                <div className={styles.noResults}>
                    <p>Không tìm thấy kết quả "<i style={{fontStyle:"italic", fontWeight:"700"}}>{searchTerm}</i>"</p>
                    <p className={styles.noResultsHint}>Vui lòng nhập lại</p>
                </div>
            )}

            {/* Table */}
            {!loading && !showNoResults && (
                <>
                    <div className={styles.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã</th>
                                    <th>Công ty</th>
                                    <th>Giá hiện tại</th>
                                    <th>Thay đổi</th>
                                    <th>% Thay đổi</th>
                                    <th>Giá mở</th>
                                    <th>Giá đóng</th>
                                    <th>Mkt cap</th>
                                    <th>Khối lượng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={item.ticker}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{item.ticker}</td>
                                        <td>{item.companyName}</td>
                                        <td>{formatPrice(item.currentPrice)}</td>
                                        <td 
                                            style={{ color: item.change >= 0 ? '#38a169' : '#e53e3e' }}
                                        >
                                            {item.change >= 0 ? '+' : ''}{item.change}
                                        </td>
                                        <td 
                                            style={{ color: item.changePercent >= 0 ? '#38a169' : '#e53e3e' }}
                                        >
                                            {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                                        </td>
                                        <td>{formatPrice(item.openPrice)}</td>
                                        <td>{formatPrice(item.previousClose)}</td>
                                        <td>{formatNumber(item.marketCap)}</td>
                                        <td>{formatNumber(item.volume)}</td>
                                        <td >
                                            <button
                                                className={styles.viewButton}
                                                onClick={() => handleViewDetail(item.ticker)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Modal */}
            {selectedTicker && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        <div className={styles.headerPopup}>
                            <div className={styles.tabs}>
                                <button onClick={() => setActiveTab('chart')}
                                    className={activeTab === 'chart' ? styles.activeTab : ''}    
                                >
                                    Giao dịch
                                </button>
                                <button onClick={() => setActiveTab('profile')}
                                        className={activeTab === 'profile' ? styles.activeTab : ''}     
                                >
                                    Hồ sơ
                                </button>
                                <button onClick={() => setActiveTab('new')}
                                        className={activeTab === 'new' ? styles.activeTab : ''}     
                                >
                                    Tin tức
                                </button>
                            </div>
                            <div className={styles.iconClose}>
                                <button onClick={() => {setSelectedTicker(null); setStockDetail(null)}}>
                                    <X/>
                                </button>
                            </div>
                            
                        </div>

                        {detailLoading ? (<p>Đang tải dữ liệu...</p>) : stockDetail ? (
                            <>
                                {activeTab === 'chart' && (
                                    <CandlestickChartTab ticker={stockDetail.ticker} companyName={stockDetail.companyName}/>
                                )}
                                {activeTab === 'profile' && (
                                    <InfoTab ticker={stockDetail.ticker}/>
                                )}
                            </>
                        ) : (
                            <p>Không thể tải dữ liệu...</p>
                        )}
                    </div>
                </div>
            )}
            {/* Phan trang */}
            <div className={styles.pagination}>
                <div className={styles.paginationInfo}>
                    <span>Hiển thị {startIndex + 1} - {Math.min(endIndex, totalItems)} tổng số {totalItems} mã</span>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className={styles.itemsPage}
                    >
                        <option value={5}>5 mã / trang</option>
                        <option value={10}>10 mã / trang</option>
                        <option value={20}>20 mã / trang</option>
                        <option value={50}>50 mã / trang</option>
                    </select>
                </div>

                <div className={styles.paginationControls}>
                    <button 
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className={styles.pageButton}>
                            <ChevronLeft size={16}/>
                    </button>
                    <div className={styles.pageNumbers}>
                        {Array.from({length:totalPages}, (_, i) => i + 1).map((page)=>{
                            if(page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                return (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                                    >
                                        {page}
                                    </button>
                                );
                            }
                            if(page === currentPage - 2 || page === currentPage + 2) {
                                return <span key={page} className={styles.pageDots}>...</span>
                            }
                            return null;
                        })}
                    </div>
                    <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={styles.pageButton}
                    >
                        <ChevronRight size={16}/>
                    </button>
                </div>
            </div>
        </div>
    );
}