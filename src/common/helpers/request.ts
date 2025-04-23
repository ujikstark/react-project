import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';


const client = axios.create();


export function request(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
) {
    return client({
        method,
        url,
        data,
        ...config,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        withCredentials: true,
        withXSRFToken: true,
        signal: config?.signal,
    });
}