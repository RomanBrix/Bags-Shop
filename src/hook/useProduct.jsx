import { useContext } from "react";
import { ProductContext } from "../hoc/ProductProvider";

export default function useProduct() {
  return useContext(ProductContext);
}
