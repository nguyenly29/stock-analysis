"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import styles from "./CandlestickChartTab.module.css";
import { getStockHistory } from "@/services/stock.service";
import { PriceHistoryPoint } from "@/types/PriceHistoryPoint";

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface StockCandlestickChartProps {
    ticker: string;
    companyName: string;
}

export default function StockCandlestickChart({
    ticker,
    companyName,
}: StockCandlestickChartProps) {
    const [history, setHistory] = useState<PriceHistoryPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<"1M" | "3M" | "6M" | "1Y" | "ALL">("3M");
    const [filteredHistory, setFilteredHistory] = useState<PriceHistoryPoint[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getStockHistory(ticker);
                setHistory(data);
            } catch (err) {
                console.error(err);
                setError("Không thể tải dữ liệu.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [ticker]);

    useEffect(() => {
        if (history.length === 0) return;

        const now = new Date();
        let cutoffDate = new Date();

        switch (dateRange) {
            case "1M":
                cutoffDate.setMonth(now.getMonth() - 1);
                break;
            case "3M":
                cutoffDate.setMonth(now.getMonth() - 3);
                break;
            case "6M":
                cutoffDate.setMonth(now.getMonth() - 6);
                break;
            case "1Y":
                cutoffDate.setFullYear(now.getFullYear() - 1);
                break;
            case "ALL":
                cutoffDate = new Date(0);
                break;
        }

        const filtered = history.filter(item => new Date(item.time) >= cutoffDate);
        setFilteredHistory(filtered);
    }, [history, dateRange]);

    const getCurrentPrice = () => {
        if (filteredHistory.length === 0) return null;
        return filteredHistory[filteredHistory.length - 1].close;
    };

    const getPriceChange = () => {
        if (filteredHistory.length < 2) return null;
        const current = filteredHistory[filteredHistory.length - 1].close;
        const previous = filteredHistory[0].close;
        const change = current - previous;
        const percent = (change / previous) * 100;
        return { change, percent };
    };

    const getHigh = () => {
        if (filteredHistory.length === 0) return null;
        return Math.max(...filteredHistory.map(item => item.high));
    };

    const getLow = () => {
        if (filteredHistory.length === 0) return null;
        return Math.min(...filteredHistory.map(item => item.low));
    };

    const getVolume = () => {
        if (filteredHistory.length === 0) return null;
        const total = filteredHistory.reduce((sum, item) => sum + item.volume, 0);
        return Math.round(total / filteredHistory.length);
    };

    const currentPrice = getCurrentPrice();
    const priceChange = getPriceChange();
    const high = getHigh();
    const low = getLow();
    const volume = getVolume();

    const series = [
        {
            data: filteredHistory.map((item) => ({
                x: new Date(item.time),
                y: [item.open, item.high, item.low, item.close],
            })),
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "candlestick",
            height: 450,
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
            },
            zoom: {
                enabled: true,
                type: "x",
                autoScaleYaxis: true,
            },
            animations: {
                enabled: true,
                speed: 800,
            },
            background: "transparent",
            foreColor: "#1F2937",
        },
        title: {
            text: `${companyName} (${ticker})`,
            align: "left",
            style: {
                fontSize: "20px",
                fontWeight: 700,
                color: "#111827",
                fontFamily: "Inter, sans-serif",
            },
        },
        subtitle: {
            text: currentPrice !== null ? `${currentPrice.toLocaleString()} VND` : "",
            align: "left",
            style: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#6B7280",
                fontFamily: "Inter, sans-serif",
            },
        },
        theme: {
            mode: "light",
        },
        xaxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: "#6B7280",
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                },
                datetimeUTC: false,
                datetimeFormatter: {
                    year: "yyyy",
                    month: "MMM 'yy",
                    day: "dd MMM",
                    hour: "HH:mm",
                },
            },
            axisBorder: {
                color: "#E5E7EB",
            },
            axisTicks: {
                color: "#E5E7EB",
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#6B7280",
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                },
                formatter: (value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                    return value.toFixed(0);
                },
            },
            tooltip: {
                enabled: true,
            },
            axisBorder: {
                color: "#E5E7EB",
            },
            axisTicks: {
                color: "#E5E7EB",
            },
        },
        grid: {
            borderColor: "#F3F4F6",
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
            },
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: "#10B981",
                    downward: "#EF4444",
                },
                wick: {
                    useFillColor: true,
                },
            },
        },
        tooltip: {
            enabled: true,
            theme: "light",
            style: {
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
            },
            x: {
                format: "dd MMM yyyy HH:mm",
            },
            y: {
                formatter: (value) => `${value.toFixed(0)} VND`,
            },
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 350,
                    },
                    title: {
                        style: {
                            fontSize: "16px",
                        },
                    },
                },
            },
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 300,
                    },
                    title: {
                        style: {
                            fontSize: "14px",
                        },
                    },
                    xaxis: {
                        labels: {
                            datetimeFormatter: {
                                day: "dd/MM",
                            },
                        },
                    },
                },
            },
        ],
    };

    const rangeButtons: { label: string; value: "1M" | "3M" | "6M" | "1Y" | "ALL" }[] = [
        { label: "1 tháng", value: "1M" },
        { label: "3 tháng", value: "3M" },
        { label: "6 tháng", value: "6M" },
        { label: "1 năm", value: "1Y" },
        { label: "Tất cả", value: "ALL" },
    ];

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorText}>{error}</p>
            </div>
        );
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h2 className={styles.title}>{companyName}</h2>
                    <span className={styles.ticker}>{ticker}</span>
                </div>
                <div className={styles.rangeSelector}>
                    {rangeButtons.map(({ label, value }) => (
                        <button
                            key={value}
                            className={`${styles.rangeButton} ${dateRange === value ? styles.rangeButtonActive : ""}`}
                            onClick={() => setDateRange(value)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <p className={styles.statLabel}>Giá hiện tại</p>
                    <p className={styles.statValue}>
                        {currentPrice !== null ? `${currentPrice.toLocaleString()} VND` : "--"}
                    </p>
                </div>
                <div className={styles.statCard}>
                    <p className={styles.statLabel}>Thay đổi</p>
                    {priceChange !== null ? (
                        <p className={priceChange.change >= 0 ? styles.statValuePositive : styles.statValueNegative}>
                            {priceChange.change >= 0 ? "+" : ""}
                            {priceChange.change.toLocaleString()} VND
                            <span className={styles.statPercent}>
                                ({priceChange.change >= 0 ? "+" : ""}
                                {priceChange.percent.toFixed(2)}%)
                            </span>
                        </p>
                    ) : (
                        <p className={styles.statValue}>--</p>
                    )}
                </div>
                <div className={styles.statCard}>
                    <p className={styles.statLabel}>Cao nhất</p>
                    <p className={styles.statValue}>
                        {high !== null ? `${high.toLocaleString()} VND` : "--"}
                    </p>
                </div>
                <div className={styles.statCard}>
                    <p className={styles.statLabel}>Thấp nhất</p>
                    <p className={styles.statValue}>
                        {low !== null ? `${low.toLocaleString()} VND` : "--"}
                    </p>
                </div>
                <div className={styles.statCard}>
                    <p className={styles.statLabel}>Khối lượng TB</p>
                    <p className={styles.statValue}>
                        {volume !== null ? `${volume.toLocaleString()}` : "--"}
                    </p>
                </div>
            </div>

            <div className={styles.chartWrapper}>
                <Chart
                    options={options}
                    series={series}
                    type="candlestick"
                    height={480}
                />
            </div>
        </section>
    );
}