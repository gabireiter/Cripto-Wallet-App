import axios from 'axios'
import {
    GET_CRIPTOS,
    GET_USER_WALLET,
    SAVE_COIN_ID,
    UPDATE_WALLET_COIN,
    INSERT_WALLET_COIN,
    DELETE_WALLET_COIN,
    PASS_AMOUNT_PARAMETER,
    USER_REGISTER,
    SAVE_LOGIN_MESSAGE
} from './types'
//import { useStore } from 'react-redux'
//import { response } from 'express'
const BINANCE_API_URL = "https://api.binance.com"

export function getBookWithReview(id) {
    const request = axios.get(`/api/getbook?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=> {
            let book = data

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data})=>{
                let response = {
                    book,
                    reviewer: data
                }

                dispatch({
                    type: 'GET_BOOK_W_REVIEWER',
                    payload: response                    
                })                
            })            
        })
    }
}

export function getCriptos(
    start=0,
    limit=10000,
    filter=""
    ){
    const request = axios.get(`${BINANCE_API_URL}/api/v3/exchangeInfo`)
    
    
    return (dispatch)=>{
        request.then(response=> {

            // console.log("yyy")
            // console.log(filter)
            // console.log(typeof filter)
            // console.log(response.data.symbols
            //     .filter(symbol=>symbol.quoteAsset === 'USDT'))
            // console.log(response.data.symbols
            //         .filter(symbol=>symbol.quoteAsset === 'USDT')
            //         .filter(symbol=>symbol.baseAsset.includes("AD")))
    
            const symbols = response.data.symbols
                                .filter(symbol=>symbol.quoteAsset === 'USDT')
                                .filter(symbol=>symbol.baseAsset.includes(filter))
                                .map(item=>item.baseAsset)
                                .slice(start, limit)
            //console.log(symbols)
            axios.get(`${BINANCE_API_URL}/api/v3/ticker/24hr`)
            .then(response=> {
                let objectToRespond = {
                    symbols,
                    prices: response.data
                                .filter(price=>price.symbol.endsWith('USDT'))
                                .filter(price=>price.symbol.includes(filter))
                                .slice(start, limit),
                    start,
                    limit,
                    filter
                }
                dispatch({
                    type: GET_CRIPTOS,
                    payload: objectToRespond                    
                })
            })  
        })
    }
}

export function getUserWallet(userId){
    const request = axios.get(`/api/GetWalletCoins?user_id=${userId}`)
                    .then(response => response.data)

    return {
        type:GET_USER_WALLET,
        payload:request
    }
}

export function saveCoinId(coinId){
    const request = axios.get(`/api/GetWalletCoinById?id=${coinId}`)
                .then(response => response.data);


    return {
        type:SAVE_COIN_ID,
        payload:request
    }
}

export function updateCoin(data,cb){
    const request = axios.post(`/api/WalletCoin_update`,data)
                .then(
                    ()=>cb()
                );

    return {
        type:UPDATE_WALLET_COIN,
        payload:'ok'
    }

}

export function insertCoin(data,cb){
    console.log(data)
    const request = axios.post(`/api/WalletCoin_insert`,data)
                .then(
                    ()=>cb()
                );

    return {
        type:INSERT_WALLET_COIN,
        payload:'ok'
    }
}

export function deleteCoin(id){
    const request = axios.delete(`/api/WalletCoin_delete?id=${id}`)
                    .then(response => response.data)

    return {
        type:DELETE_WALLET_COIN,
        payload:request
    }
}


export function saveParameterToPass(data){
    
    return {
        type:PASS_AMOUNT_PARAMETER,
        payload:data
    }

}

// export function getBooks(
//     limit=10,
//     start=0,
//     order='asc',
//     list=[]
//     ){
//     const request = axios.get(`/api/getbooks?limit=${limit}&skip=${start}&order=${order}`)
//         .then(response=> {
//             return [...list,...response.data]            
//         })

//     return {
//         type: 'GET_BOOKS',
//         payload: request
//     }
// }



export function clearBookWithReview(id) {
    return {
        type: 'CLEAR_BOOK_W_REVIEWER',
        payload: {
            book: {},
            reviewer: {}
        }
    }                
}

export function addBook(book){
    const request = axios.post('/api/book',book)
        .then(response => response.data);

    return {
        type:'ADD_BOOK',
        payload:request
    }
}
export function clearNewBook() {
    return {
        type:'CLEAR_NEWBOOK',
        payload:{}
    }
}

export function getUserPosts(userId){
    const request = axios.get(`/api/user_posts?user=${userId}`)
                    .then(response => response.data)

    return {
        type:'GET_USER_POSTS',
        payload:request
    }
}

export function getBook(id){
    const request = axios.get(`/api/getBook?id=${id}`)
                    .then(response => response.data);

    return {
        type:'GET_BOOK',
        payload:request
    }
}


export function updateBook(data){
    const request = axios.post(`/api/book_update`,data)
                .then(response => response.data);

    return {
        type:'UPDATE_BOOK',
        payload:request
    }

}

export function deleteBook(id){
    const request = axios.delete(`/api/book_delete?id=${id}`)
                    .then(response => response.data)

    return {
        type:'DELETE_BOOK',
        payload:request
    }
}

export function clearBook(){
    return{
        type:'CLEAR_BOOK',
        payload:{
            book:null,
            updateBook:false,
            postDeleted:false
        }
    }
}


///////////////////////////////////////////////////
//                   users
///////////////////////////////////////////////////

export function loginUser({email,password}){
    //console.log('Logging in User')
    const request = axios.post('/api/login',{email,password})
                .then(response => response.data)

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                .then(response => response.data)

    return {
        type:'USER_AUTH',
        payload:request
    }
}

export function getUsers(){
    const request = axios.get(`/api/getUsers`)
                    .then(response => response.data);
        
    return {
        type:'GET_USER',
        payload:request
    }
}


export function userRegister(user,userList){
    const request = axios.post(`/api/register`,user)

    return (dispatch) =>{
        request.then(({data})=>{
            let users = data.success ? [...userList,data.user]:userList;
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}

export function insertUser(userData,cb){
    console.log(userData)
    
    console.log('ggg')    
    const request = axios.post(`/api/register`,userData)
                .then(
                    ({data})=>cb(data)
                );

    return {
        type:USER_REGISTER,
        payload:'ok'
    }
}

export function saveLoginMessage(message){    
    return {
        type:SAVE_LOGIN_MESSAGE,
        payload:message
    }    
}

export function clearLoginMessage(){    
    return {
        type:SAVE_LOGIN_MESSAGE,
        payload:''
    }    
}
