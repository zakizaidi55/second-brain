import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";

export function useContent() {
    const [contents, setContents] = useState([]);
    const {token} = useSelector((state:any) => state.auth)

    async function fetchData() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers : {
                "Authorization" : token
            }
        })
        // @ts-ignore
        setContents(response?.data?.content);
    }

    useEffect(() => {
        fetchData();
    },[])

    return contents;
}