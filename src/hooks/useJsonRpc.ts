import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string, data: any) =>
    axios.post(url, data).then((res) => res.data);

export function useJsonRpc<T>(url: string, method: string, params: any): { data: any; error: any } {
    const { data, error } = useSWR([url, method, params], fetcher);
    fetcher(url, {
        jsonrpc: '2.0',
        method,
        params,
        id: new Date().getTime(),
    });

    return { data, error };
}
