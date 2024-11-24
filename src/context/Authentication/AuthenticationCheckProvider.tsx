'use client'
import { refresh_api } from '@/config/config';
import { getCookie } from 'cookies-next';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { actionTypeInterface, authenticationCheckProviderReducer, } from './AuthenticationReducer';

export const initialState = {
    role: null,
    isLoggedIn: false,
    isLoading: true,
    user_info: null,
}

export interface initialStateInterface {
    role?: null | string,
    isLoading: any,
    user_info?: undefined | null | any,
    isLoggedIn?: boolean,
}

export const AuthenticationCheck = createContext<initialStateInterface>(initialState);

const AuthenticationCheckProvider = (props: { children: React.ReactNode }) => {

    const [state, dispatch]: [initialStateInterface, (props: actionTypeInterface) => void] = useReducer(authenticationCheckProviderReducer, initialState);

    useEffect(() => {
        const run = async () => {
            try {
                dispatch({ type: 'LOADING' || '' });
                const ref_tkn: any = getCookie('ref_tkn')
                const res = await fetch(refresh_api, {
                    method: "POST",
                    headers: {
                        'ref_tkn': ref_tkn
                    },
                    body: JSON.stringify({}),
                    cache: 'default'
                })
                const data = await res.json();
                if (data?.success) {
                    dispatch({ type: 'SUCCESS', payload: data })
                }
                else {
                    dispatch({ type: 'ERROR' });
                }
            }
            catch {
                dispatch({ type: 'ERROR' });
            }
        }
        run()
    }, [dispatch]);


    return (
        <AuthenticationCheck.Provider value={state}>
            {props.children}
        </AuthenticationCheck.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthenticationCheck)
}
export default AuthenticationCheckProvider;