import { useNavigate } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import useTranslate from "../../hook/useTranslate";

function MainPage(props) {
    const navigate = useNavigate();
    const { getTranslateBlock, language } = useTranslate();
    const { typeList } = useProduct();

    // const translate = getTranslateBlock("main");

    return (
        <>
            <div
                className="mainPage forContainer intro"
                style={{ backgroundImage: 'url("/src/main/intro.jfif")' }}
            >
                <div className="container">
                    <div className="top">
                        <h1>New collection</h1>
                        {/* <h2>Winter 2023</h2> */}
                    </div>
                    <div
                        className="btn btn-go"
                        onClick={() => {
                            navigate("/shop");
                        }}
                    >
                        <span>Shop</span>
                        <span>now</span>
                    </div>
                </div>
            </div>
            <div className="mainPage forContainer plus-intro">
                <div className="container">{renderBlocks(typeList)}</div>
            </div>
        </>
    );

    function renderBlocks(blocks) {
        if (!blocks) return "";
        return blocks.map((item, index) => {
            if (index > 2) return "";
            // console.log(getSrc(item.name.ru));
            return (
                <div
                    className="block"
                    style={{
                        backgroundImage: `url("${getSrc(item.name.ru)}")`,
                    }}
                    onClick={() => {
                        navigate("/shop/" + item._id);
                    }}
                    key={index}
                >
                    <p>{item.name[language]}</p>
                </div>
            );
        });
    }

    function getSrc(name) {
        // console.log(name.toLowerCase());
        switch (name.toLowerCase()) {
            case "кошелек":
                return "/src/main/wallet.jfif";

            case "рюкзаки":
                return "/src/main/backpack.jfif";

            case "сумки":
                return "/src/main/bag.jfif";

            default:
                return "";
        }
    }
}

export default MainPage;
