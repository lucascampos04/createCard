import React from "react"
import "../public/css/HeaderStyle.css"

function HeaderC({language, onLanguageToggle}){
    return(
        <header>
            <h1>Validation Card</h1>
            <button className="btnLanguage" onClick={onLanguageToggle}>
                {language === 'en' ? 'PR-BR':'EN'}
            </button>
        </header>
    )
}

export default HeaderC