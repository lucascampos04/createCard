import { useState } from "react"
import FormCard from "../components/formCard"
import HeaderC from "../components/headerC"
import "../public/css/HomeStyle.css"

function HomePages(){
    
  const [language, setLanguage] = useState("en")

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt-br' : 'en')
  }

    return(
        <div>
            <HeaderC language={language} onLanguageToggle={toggleLanguage}/>
            <FormCard />
        </div>
        
    )
}

export default HomePages