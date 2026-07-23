"use client";

import { Bell, Search, User } from "lucide-react";
import style from "./Header.module.css";
import { useEffect, useState } from "react";

export default function Header (){
    // const [currentTime, setCurrentTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000);
    //     return () => clearInterval(timer);
    // }, []);
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
                    <input type="input" placeholder="Nhập mã cần tra cứu..."/>
                    <button><Search/></button>
                </div>
            </div>
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