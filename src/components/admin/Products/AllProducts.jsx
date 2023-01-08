import { createUserAxiosRequest } from "../../../requestMethods";
import ProductsHead from "./ProductsHead";

export default function AllProducts({ allFilters, events }) {
    const protectedRequest = createUserAxiosRequest();
    return (
        <div className="admin">
            <div className="center">
                <ProductsHead allFilters={allFilters} events={events} />
                <button onClick={addProduct}>ADd</button>
            </div>
        </div>
    );

    async function addProduct() {
        try {
            const res = await protectedRequest.post("/products/", {});
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}
