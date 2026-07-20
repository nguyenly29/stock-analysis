import Link from "next/link";
import style from "./SideBar.module.css";
import { ChartNoAxesCombined, LayoutDashboard, LayoutList, Settings } from "lucide-react";

export default function SideBar() {
    return (
        <div className={style.container}>
            <div className={style.dashboard}>
                <LayoutDashboard/>
                <Link href="/">Overview</Link>
            </div>
            <div className={style.stock}>
                <ChartNoAxesCombined/>
                <Link href="/stock">Stock</Link>
            </div>
            <div className={style.watchlist}>
                <LayoutList/>
                <Link href="/watchlist">Watchlist</Link>
            </div>
            <div className={style.setting}>
                <Settings/>
                <Link href="/setting">Settings</Link>
            </div>
        </div>
    )
}