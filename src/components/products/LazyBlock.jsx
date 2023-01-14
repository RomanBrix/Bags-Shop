import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Loader } from "../svg/hearts.svg";

function LazyBlock({ title, price, img, id }) {
    // console.log(img);
    const LazyImg = getLazyImage({ src: img, alt: "" });
    const navigate = useNavigate();
    return (
        <div
            className="block"
            onClick={() => {
                navigate(`/product/${id}`);
            }}
        >
            <div className="img">
                <Suspense
                    fallback={
                        <div className="loading">
                            <Loader />
                        </div>
                    }
                >
                    <LazyImg />
                </Suspense>
            </div>

            <div className="info">
                <h3>{title}</h3>
                <p>{price} UAH</p>
            </div>
        </div>
    );
}

const getImageComponent =
    ({ src, alt }) =>
    () =>
        <img className="image" src={src} alt={alt} />;

const getLazyImage = ({ src, alt = "" }) =>
    lazy(
        () =>
            new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => {
                    //   setTimeout(()=>{
                    //     resolve({
                    //     default: getImageComponent({ src, alt }),
                    //   });
                    // }, 15000)
                    resolve({
                        default: getImageComponent({ src, alt }),
                    });
                };
                image.onerror = reject;
                image.src = src;
            })
    );

export default LazyBlock;
