// const items = [...Array(33).keys()];

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

export default function Pagination({
    itemsPerPage,
    items,
    urlItemOffset = 0,
    setCurrentItems,
    filters,
}) {
    const [clickedTarget, setClickedTarget] = useState(urlItemOffset + 1);
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(
        (urlItemOffset * itemsPerPage) % items.length
    );

    const itemHeadLine = items[0] ? items[0].title + items.length : "";

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        const curItems = items.slice(itemOffset, endOffset);
        setCurrentItems(curItems);
        // eslint-disable-next-line
        setPageCount(Math.ceil(items.length / itemsPerPage));
        // eslint-disable-next-line
    }, [itemOffset, itemsPerPage, itemHeadLine]);
    // eslint-disable-next-line
    useEffect(() => {
        navigate(`?page=${clickedTarget}`);
    }, [clickedTarget]);
    useEffect(() => {
        changePage(urlItemOffset);
        // }
        // eslint-disable-next-line
    }, [urlItemOffset]);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setClickedTarget(() => +event.selected + 1);
    };
    useEffect(() => {
        if (pageCount < urlItemOffset + 1 && filters.length > 0) {
            changePage(0);
            navigate(`?page=${1}`);
        }
        if (filters.length === 0) {
            changePage(urlItemOffset);
        }
        // eslint-disable-next-line
    }, [pageCount, filters.length]);

    function changePage(num = 1) {
        let leng = items.length;
        if (leng === 0) leng = 1;
        const newOffset = (num * itemsPerPage) % leng;
        setItemOffset(newOffset);
    }
    return (
        <>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active-pag"
                renderOnZeroPageCount={null}
                disableInitialCallback={true}
                initialPage={urlItemOffset}
            />
        </>
    );
}
