import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
    if (!id) {
        return (
            <div className="success forContainer">
                <div className="container">
                    <h1>Спасибо!</h1>
                    <p>Ваш заказ принят!</p>
                </div>
            </div>
        );
    }
    return (
        <div className="success forContainer">
            <div className="container">
                <h1>Спасибо!</h1>
                <p>Ваш заказ принят!</p>
            </div>
        </div>
    );
}
