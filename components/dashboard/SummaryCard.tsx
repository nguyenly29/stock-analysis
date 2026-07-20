import { ReactNode } from "react";
import styles from "./SummaryCard.module.css";

interface SummaryCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: ReactNode;
}

export default function SummaryCard({
    title,
    value,
    subtitle,
    icon,
}: SummaryCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>

                <div className={styles.icon}>
                    {icon}
                </div>
            </div>

            <div className={styles.value}>
                {value}
            </div>

            <div className={styles.subtitle}>
                {subtitle}
            </div>
        </div>
    );
}