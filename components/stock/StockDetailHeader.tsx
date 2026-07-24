import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import styles from "./StockDetailHeader.module.css";
import { StockDetail } from "@/types/StockDetail";

interface StockDetailHeaderProps {
    detail: StockDetail;
}

export default function StockDetailHeader({
    detail,
}: StockDetailHeaderProps) {

    return (
        <section className={styles.container}>

            <div className={styles.topBar}>

                <Link
                    href="/"
                    className={styles.backButton}
                >
                    <ArrowLeft size={20} />

                    <span>
                        Back
                    </span>

                </Link>

            </div>

            <div className={styles.content}>

                <div>

                    <h1 className={styles.companyName}>
                        {detail.companyName}
                    </h1>

                    <div className={styles.info}>

                        <span>
                            {detail.ticker}
                        </span>

                        <span className={styles.separator}>
                            •
                        </span>

                        <span>
                            {detail.sector}
                        </span>

                        <span className={styles.separator}>
                            •
                        </span>

                        <span>
                            {detail.exchange}
                        </span>

                    </div>

                </div>

            </div>

        </section>
    );
}