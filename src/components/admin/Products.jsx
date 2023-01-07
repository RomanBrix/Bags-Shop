import { createUserAxiosRequest } from "../../requestMethods";

export default function Products() {
    const protectedRequest = createUserAxiosRequest();
    return (
        <div className="admin">
            <div className="center">
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
