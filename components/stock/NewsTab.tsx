import { getNews } from "@/services/New.service";
import { News } from "@/types/News";
import { useEffect, useState } from "react";
import styles from './NewsTab.module.css';
import Image from "next/image";
import Link from "next/link";

export default function NewsTab() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async() => {
        try {
            const res = await getNews();
            setNews(res);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if(loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>
    return (
        <div className={styles.container}>
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
    )
}