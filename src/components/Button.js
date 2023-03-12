import React from 'react'

function Button({button}) {
    return (
        <div className="buttons">
            {
                button.map((cat, i)=>{
                    return <button type="button"  className="btn">{cat}</button>
                })
            }
        </div>
    )
}

export default Button;