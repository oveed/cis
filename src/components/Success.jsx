import React from 'react'
import "./Registration.css";

export default function Success() {
    return (
        <div className="header-signup" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '5rem'}}>
            <h2 style={{ marginBottom: "0.4rem" }}>Thank you!</h2>
            <h4>We'll get back to you ASAP 😀</h4>
        </div>
    )
}
