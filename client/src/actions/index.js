import axios from 'axios'
import {GET_CRIPTOS} from './types'
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
    limit=3
    ){
    const request = axios.get(`${BINANCE_API_URL}/api/v3/exchangeInfo`)

    return (dispatch)=>{
        request.then(response=> {
            
            const symbols = response.data.symbols.filter(symbol=>symbol.quoteAsset === 'USDT').map(item=>item.baseAsset).slice(start, limit)
            //console.log(symbols)
            axios.get(`${BINANCE_API_URL}/api/v3/ticker/24hr`)
            .then(response=> {
                let objectToRespond = {
                    symbols,
                    prices: response.data.filter(price=>price.symbol.endsWith('USDT')).slice(start, limit),
                    start,
                    limit
                }
                dispatch({
                    type: GET_CRIPTOS,
                    payload: objectToRespond                    
                })
            })  
        })
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