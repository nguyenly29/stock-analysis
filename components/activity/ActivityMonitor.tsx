'use client';

import { ActivityLogRes } from '@/types/ActivityLog';
import styles from './ActivityMonitor.module.css';
import { useEffect, useState } from 'react';
import { clearActivity, getActivities } from '@/services/activity.service';
import { Shredder } from 'lucide-react';

export default function ActivityMonitor() {
    const [logs, setLogs] = useState<ActivityLogRes[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrenPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    //Tinh toan cho phan trang
    const total = logs.length;
    const totalPage = Math.ceil(total / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentLogs = logs.slice(startIndex, endIndex);

    // Fetch data 
    const fetchLogs = async() => {
        try {
            setLoading(true);
            const data = await getActivities(100);
            setLogs(data);
        } catch (error:any){
            console.error(error);
        } finally {
            setLoading(false);
        };
    };

    // Delete logs
    const handleClear = async() => {
        if(confirm("Sau khi xóa toàn bộ lịch sử sẽ biến mất!")){
            await clearActivity();
            await fetchLogs();
        }
    };

    // Call API sau khi component mount
    useEffect(() => {
        fetchLogs();
    }, []);

    // Next page
    const goToPage = (page:number) => {
        if(page >= 1 && page <= totalPage){
            setCurrenPage(page);
        }
    };

    // Doi so item/trang
    const handlePageSizeChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        setCurrenPage(1); // Back ve trang dau
    }

    // Tao so trang hien thi
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const total = totalPage;
        const current = currentPage;

        if (total <= 5) {
            for (let i = 1; i <= total; i++) pages.push(i);
            return pages;
        }

        pages.push(1);
        if (current > 3) pages.push('...');

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        for (let i = start; i <= end; i++) pages.push(i);

        if (current < total - 2) pages.push('...');
        if (total > 1) pages.push(total);

        return pages;
    };
    return(
        <div className={styles.container}>
            <div className={styles.activityLogs}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>ACTIVITY LOG</h1>
                        <p>Lịch sử theo dõi thao tác/hoạt động</p>
                    </div>
                    <div className={styles.clearBtn}>
                        <button onClick={handleClear}>
                            Xóa tất cả
                            <Shredder/>
                        </button>
                    </div>
                </div>
                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>Hành động</th>
                                <th>Chi tiết</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                    <tr>
                                        <td colSpan={3} className={styles.loadingCell}>
                                            <div className={styles.spinner}></div>
                                            Đang tải dữ liệu...
                                        </td>
                                    </tr>
                            ) : currentLogs.length===0 ? (
                                    <tr>
                                        <td colSpan={3} className={styles.emptyCell}>
                                            Chưa có hoạt động nào được ghi nhận
                                        </td>
                                    </tr>
                            ) : (
                                currentLogs.map((log) => (
                                    <tr key={log.id}>
                                        <td>{log.action}</td>
                                        <td>{log.detail}</td>
                                        <td>{new Date(log.timestamp).toLocaleString("vi-VN", {timeZone:"Asia/Ho_Chi_Minh"})}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {/*Phan trang */}
                    {totalPage > 1 && (
                        <div className={styles.pagination}>
                            <div className={styles.displayPage}>
                                <span>Hiển thị</span>
                                <select value={pageSize} onChange={handlePageSizeChange}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    {/* <option value={50}>50</option>
                                    <option value={100}>100</option> */}
                                </select>
                                <span>mục/trang</span>
                            </div>
                            <div className={styles.pageBtn}>
                                <button onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1} className={styles.btnLeft}>
                                    &lt;
                                </button>
                                {getPageNumbers().map((page, index) => {
                                    if(page==='...'){
                                        return (
                                            <span key={`ellipsis-${index}`} className={styles.pageDots}>
                                                …
                                            </span>
                                        );
                                    }
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page as number)}
                                            className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                                        >
                                            {page}
                                        </button>
                                    )
                                })}
                                <button onClick={()=> goToPage(currentPage+1)} disabled={currentPage===totalPage} className={styles.btnRight}>
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}