import React from 'react'
import thLogo from '../assets/img/trueHomeLogo.png';
import './Header.css';


export function Header() {
    const headerDate = { date: new Date() }
    return (
        <div className="container header_container">
            <img src={thLogo} alt="True Home Logo" className="logoHeader" />
            <div className="flex flex_align_items_center">
                <div className="header_text">To Do List APP</div>
                <div className="header_date">{headerDate.date.toLocaleDateString()}</div>
            </div>
        </div>
    );
}