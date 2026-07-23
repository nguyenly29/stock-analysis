"use clinet";

import { MarketIndexItem } from "@/types/MarketIndexItem"
import style from "./MarketTicker.module.css";

interface MarketIndexProps {
    indexes: MarketIndexItem[];
}

export default function MarketTicker({ indexes }: MarketIndexProps) {
    return (
        <div className={style.container}>
            {indexes.map((item) => (
                <div className={style.item} key={item.symbol}>
                    <span className={style.symbol}>
                        {item.symbol}
                    </span>

                    <span className={style.value}>
                        {item.value.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>

                    <span
                        className={
                            item.change >= 0
                                ? style.up
                                : style.down
                        }
                    >
                        {item.change >= 0 ? "▲" : "▼"}{" "}
                        {Math.abs(item.change).toFixed(2)} (
                        {Math.abs(item.changePercent).toFixed(2)}%)
                    </span>
                </div>
            ))}
        </div>
    )
}

// import styles from "./MarketTicker.module.css";
// import { mockMarketIndex } from "@/data/mock-market-index";
// import { MarketIndexItem } from "@/types/MarketIndexItem";

// interface Props {
//     summary: MarketIndexItem;
// }

// export default function SummarySection({ summary }: Props) {
     
//     return (
//         <section className={styles.container}>
//             {mockMarketIndex.map((item, index) => (
//                 <div key={item.symbol} className={styles.item}>

//                     <span className={styles.symbol}>
//                         {item.symbol}
//                     </span>

//                     <span className={styles.value}>
//                         {item.value.toLocaleString()}
//                     </span>

//                     <span
//                         className={
//                             item.change >= 0
//                                 ? styles.up
//                                 : styles.down
//                         }
//                     >
//                         {item.change >= 0 ? "▲" : "▼"}
//                         {" "}
//                         {Math.abs(item.changePercent)}%
//                     </span>

//                     {/* {index !== mockMarketIndex.length - 1 && (
//                         <span className={styles.separator}>|</span>
//                     )} */}

//                 </div>
//             ))}
//             <div className={styles.item}>
//                 <span className={styles.symbol}>LISTED</span>
//                 <span className={styles.value}>{summary.symbol}</span>
//                 {/* <span className={styles.separator}>|</span> */}
//             </div>

//             <div className={styles.item}>
//                 <span className={styles.symbol}>ADV</span>
//                 <span className={styles.up}>{summary.value}</span>
//                 {/* <span className={styles.separator}>|</span> */}
//             </div>

//             <div className={styles.item}>
//                 <span className={styles.symbol}>DEC</span>
//                 <span className={styles.down}>{summary.change}</span>
//                 {/* <span className={styles.separator}>|</span> */}
//             </div>

//             <div className={styles.item}>
//                 <span className={styles.symbol}>MKT CAP</span>
//                 <span className={styles.value}>
//                     {summary.changePercent}
//                 </span>
//             </div>
//         </section>
//     );
// }