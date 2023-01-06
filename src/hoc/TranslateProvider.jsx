import Cookies from "js-cookie";
import { createContext, useState } from "react";
import TranslateText from "./translate";



export const TranslateContext = createContext(null);



function TranslateProvider({children}){
    const [ language, setLanguage ] = useState( Cookies.get('language') || 'ua');
    const [ translate, setTranslate] = useState(TranslateText[language])

    function changeLanguage(lang) {
        setLanguage(lang);
        setTranslate(TranslateText[lang])
        Cookies.set('language', lang)
    }
    function getTranslateBlock(block) {
        return translate[block];
    }
    const val = {
        changeLanguage,
        language,
        getTranslateBlock
      };
      return (
        <TranslateContext.Provider value={val}>{children}</TranslateContext.Provider>
      );
}


export default TranslateProvider;