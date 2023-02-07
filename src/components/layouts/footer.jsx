import { useNavigate } from "react-router-dom";
import useTranslate from "../../hook/useTranslate";
import { ReactComponent as Copyright } from "../svg/copyright.svg";
import { ReactComponent as Insta } from "../svg/insta.svg";

function Footer(props) {
    const navigate = useNavigate();
    const { getTranslateBlock } = useTranslate();
    const translate = getTranslateBlock("footer");

    return (
        <div className="footer forContainer">
            <div className="container">
                <ul>
                    <li
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <Copyright className="copy" />
                        <span>Bags de reve</span>
                    </li>
                    <li
                        onClick={() => {
                            navigate("/return");
                        }}
                    >
                        {translate.return}
                    </li>
                    <li
                        onClick={() => {
                            navigate("/terms");
                        }}
                    >
                        {translate.terms}
                    </li>
                    {/* <li onClick={()=>{navigate('/delivery')}}>{translate.delivery}</li> */}
                    <li
                        onClick={() => {
                            navigate("/contacts");
                        }}
                    >
                        {translate.contacts}
                    </li>
                    <li
                        onClick={() => {
                            alert("insta");
                        }}
                    >
                        <Insta />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
