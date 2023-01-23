import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTranslate from "../hook/useTranslate";

export default function Success() {
    const location = useLocation();
    const id = location.search.split("=")[1];
    console.log(id);
    //if get id = show status and thank page
    //else
    //just say thank
    useEffect(() => {
        if (id) {
            //get order
        }
    }, []);
    const { getTranslateBlock } = useTranslate();
    const translate = getTranslateBlock("successPage");
    console.log(translate);
    if (!id) {
        return (
            <div className="success forContainer">
                <div className="container">
                    <h1>{translate.head}</h1>
                    <p>{translate.ok}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="success forContainer">
            <div className="container">
                <h1>{translate.head}</h1>
                <p>{translate.ok}</p>
            </div>
        </div>
    );
}
