import {useReducer, createContext, useEffect} from "react";
import {LOGIN, LOGOUT} from "./actions";
import axios from "axios";
import {useRouter} from "next/router";


//initial state
const initialState = {
    user: null
}

//create context
const Context = createContext()

//root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload}
        case LOGOUT:
            return {...state, user: null}
        default:
            return state;
    }
}

//context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    const router = useRouter();
    useEffect(() => {
        const user = localStorage.getItem("user")
        dispatch({
            type: LOGIN, payload: user ? JSON.parse(user) : null
        })
    }, [])

    axios.interceptors.response.use((response) => {
        //any status code that falls between 2xx
        return response;
    }, (error) => {
        //any response out of 2xx
        let res = error.response;
        if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
            return new Promise((resolve, reject) => {
                axios.get('/api/auth/logout').then((data) => {
                    console.log("/401 error > logout")
                    dispatch({type: LOGOUT})
                    localStorage.removeItem("user")
                    router.push('/login')
                }).catch((err) => {
                    console.log("AXIOS INTERCEPTORS ERROR", err)
                    reject(error)
                })
            })
        }
        return Promise.reject(error);
    })

    useEffect(() => {
        const getCsrfToken = async () => {
            const {data} = await axios.get('/api/csrf-token')
            axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
        }
        getCsrfToken();
    }, [])

    return (<Context.Provider value={{state, dispatch}}>
        {children}
    </Context.Provider>)
}

export {Context, Provider}