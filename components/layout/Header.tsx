"use client";

import { Bell, Search, User, X } from "lucide-react";
import style from "./Header.module.css";
import { useEffect, useState } from "react";
import { RealtimePrice } from "@/types/RealtimePrice";
import { getRealtimeStocks, getStockDetail } from "@/services/stock.service";
import CandlestickChartTab from "../stock/CandlestickChartTab";

export default function Header (){
    // const [currentTime, setCurrentTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000);
    //     return () => clearInterval(timer);
    // }, []);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<RealtimePrice[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [stockDetail, setStockDetail] = useState<any>(null);

    // Search
    const handleSearch = async (value: string) => {
        setSearchTerm(value);
        if (value.trim().length === 0) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        try {
            const allStocks = await getRealtimeStocks();
            const filtered = allStocks.filter((stock) =>
                stock.ticker.toLowerCase().includes(value.toLowerCase()) ||
                stock.companyName.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filtered.slice(0, 8)); // Giới hạn 8 kết quả
            setShowDropdown(true);
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        }
    };

    // Open, close popup
    const handleOpenPopup = async (ticker: string) => {
        setShowDropdown(false);
        setSelectedTicker(ticker);
        setShowPopup(true);
        try {
            const detail = await getStockDetail(ticker);
            setStockDetail(detail);
        } catch (error) {
            console.error("Lỗi lấy chi tiết:", error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedTicker(null);
        setStockDetail(null);
    };

    useEffect(() => {
        setCurrentTime(new Date());

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className={style.container}>
            <h1>STOCK ANALYSIS</h1>
            <div className={style.search}>
                <div className={style.item}>
                    <input type="input" placeholder="Nhập mã cần tra cứu..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    />
                    <button><Search/></button>
                </div>
                {/* Dropdown kết quả tìm kiếm */}
                {showDropdown && searchResults.length > 0 && (
                    <div className={style.dropdown}>
                        {searchResults.map((stock) => (
                            <div
                                key={stock.ticker}
                                className={style.dropdownItem}
                                onMouseDown={(e) => {
                                    e.preventDefault(); 
                                    handleOpenPopup(stock.ticker);
                                }}
                            >
                                <span className={style.dropdownTicker}>{stock.ticker}</span>
                                <span className={style.dropdownName}>{stock.companyName}</span>
                                <span className={style.dropdownPrice}>
                                    {stock.currentPrice.toLocaleString("vi-VN")}₫
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Popup chi tiết */}
            {showPopup && selectedTicker && (
                <div className={style.overlay} onClick={handleClosePopup}>
                    <div className={style.popup} onClick={(e) => e.stopPropagation()}>
                        <div className={style.popupHeader}>
                            <button onClick={handleClosePopup} className={style.closeBtn}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={style.popupContent}>
                            {stockDetail ? (
                                <CandlestickChartTab
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
            <div className={style.icon}>
                <div className={style.liveInfo}>
                    <span className={style.liveDot}></span>
                    <span className={style.liveText}>
                        LIVE
                    </span>
                    {/* <span className={style.time}>
                        {currentTime.toLocaleTimeString("vi-VN")}
                    </span> */}
                    <span className={style.time}>
                        {currentTime
                            ? currentTime.toLocaleTimeString("vi-VN")
                            : "--:--:--"}
                    </span>
                </div>
                <div className={style.bell}>
                    <Bell/>
                </div>
                <div className={style.user}>
                    <User/>
                </div>
            </div>
        </div>
    )
}



// "use client";

// import { Bell, Search, User, X } from "lucide-react";
// import style from "./Header.module.css";
// import { useEffect, useState } from "react";
// import { RealtimePrice } from "@/types/RealtimePrice";
// import { getRealtimeStocks, getStockDetail } from "@/services/stock.service";
// import StockCandlestickChart from "../dashboard/StockCandlestickChart";

// export default function Header (){
//     // const [currentTime, setCurrentTime] = useState(new Date());
//     const [currentTime, setCurrentTime] = useState<Date | null>(null);
//     // useEffect(() => {
//     //     const timer = setInterval(() => {
//     //         setCurrentTime(new Date());
//     //     }, 1000);
//     //     return () => clearInterval(timer);
//     // }, []);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [searchResults, setSearchResults] = useState<RealtimePrice[]>([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const [stockDetail, setStockDetail] = useState<any>(null);

//     // Search
//     const handleSearch = async (value: string) => {
//         setSearchTerm(value);
//         if (value.trim().length === 0) {
//             setSearchResults([]);
//             setShowDropdown(false);
//             return;
//         }

//         try {
//             const allStocks = await getRealtimeStocks();
//             const filtered = allStocks.filter((stock) =>
//                 stock.ticker.toLowerCase().includes(value.toLowerCase()) ||
//                 stock.companyName.toLowerCase().includes(value.toLowerCase())
//             );
//             setSearchResults(filtered.slice(0, 8)); // Giới hạn 8 kết quả
//             setShowDropdown(true);
//         } catch (error) {
//             console.error("Lỗi tìm kiếm:", error);
//         }
//     };

//     // Open, close popup
//     const handleOpenPopup = async (ticker: string) => {
//         setShowDropdown(false);
//         setSelectedTicker(ticker);
//         setShowPopup(true);
//         try {
//             const detail = await getStockDetail(ticker);
//             setStockDetail(detail);
//         } catch (error) {
//             console.error("Lỗi lấy chi tiết:", error);
//         }
//     };

//     const handleClosePopup = () => {
//         setShowPopup(false);
//         setSelectedTicker(null);
//         setStockDetail(null);
//     };

//     useEffect(() => {
//         setCurrentTime(new Date());

//         const timer = setInterval(() => {
//             setCurrentTime(new Date());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);
//     return (
//         <div className={style.container}>
//             <h1>STOCK ANALYSIS</h1>
//             <div className={style.search}>
//                 <div className={style.item}>
//                     <input type="input" placeholder="Nhập mã cần tra cứu..."
//                         value={searchTerm}
//                         onChange={(e) => handleSearch(e.target.value)}
//                         onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
//                         onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
//                     />
//                     <button><Search/></button>
//                 </div>
//                 {/* Dropdown kết quả tìm kiếm */}
//                 {showDropdown && searchResults.length > 0 && (
//                     <div className={style.dropdown}>
//                         {searchResults.map((stock) => (
//                             <div
//                                 key={stock.ticker}
//                                 className={style.dropdownItem}
//                                 onClick={() => handleOpenPopup(stock.ticker)}
//                             >
//                                 <span className={style.dropdownTicker}>{stock.ticker}</span>
//                                 <span className={style.dropdownName}>{stock.companyName}</span>
//                                 <span className={style.dropdownPrice}>
//                                     {stock.currentPrice.toLocaleString("vi-VN")}₫
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//             {/* Popup chi tiết */}
//             {showPopup && selectedTicker && (
//                 <div className={style.overlay} onClick={handleClosePopup}>
//                     <div className={style.popup} onClick={(e) => e.stopPropagation()}>
//                         <div className={style.popupHeader}>
//                             <h3>{selectedTicker} - Chi tiết</h3>
//                             <button onClick={handleClosePopup} className={style.closeBtn}>
//                                 <X size={20} />
//                             </button>
//                         </div>
//                         <div className={style.popupContent}>
//                             {stockDetail ? (
//                                 <StockCandlestickChart
//                                     ticker={stockDetail.ticker}
//                                     companyName={stockDetail.companyName}
//                                 />
//                             ) : (
//                                 <p>Đang tải dữ liệu...</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}   
//             <div className={style.icon}>
//                 <div className={style.liveInfo}>
//                     <span className={style.liveDot}></span>
//                     <span className={style.liveText}>
//                         LIVE
//                     </span>
//                     {/* <span className={style.time}>
//                         {currentTime.toLocaleTimeString("vi-VN")}
//                     </span> */}
//                     <span className={style.time}>
//                         {currentTime
//                             ? currentTime.toLocaleTimeString("vi-VN")
//                             : "--:--:--"}
//                     </span>
//                 </div>
//                 <div className={style.bell}>
//                     <Bell/>
//                 </div>
//                 <div className={style.user}>
//                     <User/>
//                 </div>
//             </div>
//         </div>
//     )
// }