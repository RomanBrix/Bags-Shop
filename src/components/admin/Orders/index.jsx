import { Route, Routes } from "react-router-dom";
import AllOrders from "./AllOrders";
import SingleOrder from "./SingleOrder";

export default function Orders() {
    // useEffect(() => {
    //     loadTypeFilters();
    //     loadBrandFilters();
    // }, []);

    return (
        <Routes>
            <Route index element={<AllOrders />} />
            <Route path=":id" element={<SingleOrder />} />
        </Routes>
    );
}
