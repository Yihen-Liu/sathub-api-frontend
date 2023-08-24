import useSWR from 'swr'
import {backendURL} from "../config";
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const fetcherWithJwt = ([url, token]:[string, string]) =>{
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return fetch(url, { headers }).then((response) => response.json());
}

export const useSampleClients = () => {
    const { data, error } = useSWR('/sathub/data-sources/clients.json', fetcher)

    return {
        clients: data?.data ?? [],
        isLoading: !error && !data,
        isError: error,
    }
}

export const useSampleTransactions = () => {
    const { data, error } = useSWR('/sathub/data-sources/history.json', fetcher)

    return {
        transactions: data?.data ?? [],
        isLoading: !error && !data,
        isError: error,
    }
}

export const useSubscribe = (jwtToken:string) => {
    const { data, error } = useSWR([backendURL+"/subscription",jwtToken], fetcherWithJwt);
    return {
        subscriptions: data,
        isLoading: !error && !data,
        isError: error,
    }
}
export const useSubscribeHistory = (jwtToken:string) => {
    const { data, error } = useSWR([backendURL+"/subscriptionHistory",jwtToken], fetcherWithJwt);
    return {
        subscriptions: data,
        isLoading: !error && !data,
        isError: error,
    }
}
