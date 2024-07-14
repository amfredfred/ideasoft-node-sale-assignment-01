import React from 'react'

export default function MasterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout">
            <div className="layout-mini">
                {children}
            </div>
        </div>
    )
}