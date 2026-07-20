"use client";

import { Bell, Search, User } from "lucide-react";
import style from "./Header.module.css";

export default function Header (){
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