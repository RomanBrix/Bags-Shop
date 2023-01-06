import { useContext } from "react";
import { TranslateContext } from "../hoc/TranslateProvider";

export default function useTranslate() {
  return useContext(TranslateContext);
}
