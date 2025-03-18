import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    async function fetchData() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        })
        
        
        console.log(response);
        // @ts-ignore
        setContents(response?.data?.content);
    }

    useEffect(() => {
        fetchData();
    },[])

    return contents;
}