import { useSelector } from "react-redux";

export const useAppSelector = (name) => useSelector((state) => state[name]);
