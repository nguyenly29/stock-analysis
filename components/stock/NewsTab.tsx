import { getNews } from "@/services/New.service";
import { News } from "@/types/News";
import { useEffect, useState } from "react";
import styles from './NewsTab.module.css';
import Image from "next/image";

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
                        <h1>{item.title}</h1>
                        <i>{item.summary}</i>
                        <p>{item.content}</p>
                        <p>{item.source}</p>
                        <p>{item.publishedAt}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}