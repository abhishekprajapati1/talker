import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { AxiosRequestConfig } from "axios";

interface UseFetch {
    endpoint: string;
    id?: string;
    validate?: boolean;
    options?: AxiosRequestConfig;
    sendWholeResonse?: boolean;
}

const useFetch = ({ endpoint, id, validate = false, options, sendWholeResonse = false }: UseFetch) => {


    const result = useQuery({
        queryKey: [endpoint, ...(id ? [id] : [])],
        queryFn: async () => {
            const res = id ? await api.get(endpoint + "/" + id, { ...(options && options) }) : await api.get(endpoint, { ...(options && options) });
            if (sendWholeResonse) return res.data;
            return res.data?.data;
        },
        enabled: validate ? Boolean(id) : true,
    });
    return result;
};

export default useFetch;