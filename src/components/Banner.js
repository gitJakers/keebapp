import React from 'react'

export default function Banner({title:PageTitle}) {
    return (
        <>
            {/* Page Title */}
            <div className="Banner">
                <h1 className="HeaderTitle">
                    {PageTitle}
                </h1>
            </div >
        </>
    )
}
