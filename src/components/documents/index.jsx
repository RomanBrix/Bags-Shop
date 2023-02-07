import { useLocation } from "react-router-dom";
import useTranslate from "../../hook/useTranslate";

export default function Documents() {
    const { pathname } = useLocation();
    const { getTranslateBlock, language } = useTranslate();

    const block = pathname.split("/")[1];
    const Text = getTranslateBlock(block);
    // console.log(Text);

    return (
        <div className="forContainer documents">
            <div className="container">
                {Text ? <Text /> : <h1>Not Found</h1>}
            </div>
        </div>
    );
}
