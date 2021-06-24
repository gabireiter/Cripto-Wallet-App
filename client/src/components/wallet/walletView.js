import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCriptos,getUserWallet} from '../../actions'

//import BookItem from '../widgetsUI/book_item'

class WalletView extends Component {

    state = {
        showShowMore: true,        
    }
    
    componentDidMount(){
        this.loadCriptos()
        this.props.dispatch(getUserWallet(this.props.user.login.id))
    }

    changeFilter(filter){        
        var limit;
        limit = filter!==""?10000:6
        this.setState({showShowMore: filter===""})
        this.loadCriptos(limit,filter)        
    }
    
    loadmore = ()=>{
        var count=0
        count = this.props.criptos.list.limit+3
        
        this.loadCriptos(count, this.props.criptos.list.filter)
    }

    loadCriptos(count,filter){
        this.props.dispatch(getCriptos(0,count,filter))
    }

    loadfilter = ()=>{
        this.loadCriptos()
    }

    renderTitle() {
        return(
            <h2>My Wallet</h2>
        )
    }

    renderSearch() {
        return(
            <div>
            <h2>Search: </h2>
            <input type="text" onChange={event => this.changeFilter(event.target.value)}/>
            </div>
        )
    }

    renderTable(criptos,wallet) {
        return(
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.renderCriptos(criptos,wallet)
                    }
                </tbody>
            </table>
        )
    }

    renderCriptos = (criptos,wallet)=>{
        console.log(criptos)
        console.log(wallet)
        return wallet && typeof criptos !== "undefined"? 
            // Loop among all the coins of the wallet
            wallet.map((item,i) => {
                //I look for the price of the coin
                const coin = criptos.prices.filter(price=>price.symbol===item.symbol+"USDT")[0]
                return (
                    <tr key={i}>
                    <td>                        
                        {item.symbol}   
                    </td>                     
                    <td>
                        {                            
                            parseFloat(coin.lastPrice).toFixed(2)
                        }
                    </td>
                    <td>
                        {                            
                            parseFloat(item.amount).toFixed(9)
                        }
                    </td>
                    <td>
                        {                            
                            parseFloat(coin.lastPrice*item.amount).toFixed(2)
                        }
                    </td>
                    <td>
                        <div style={{color: coin.priceChangePercent>=0 ? "#149414":"#ff0000"}} >
                        {
                            coin.priceChangePercent
                        //moment(item.createdAt).format("DD/MM/YYYY")
                        }
                        </div>
                    </td>
                </tr>
            )})
        :null
    }

    render() {
        const criptos = this.props.criptos.list        
        const wallet = this.props.criptos.wallet
        console.log(this.props)
        return (
            <div>
                <div className="user_posts">
                    {this.renderTitle()}
                    {this.renderTable(criptos,wallet   )}                
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    //console.log("aaa")
    //console.log(state)
    return {
        criptos: state.cripto
    }
}

export default connect(mapStateToProps)(WalletView) ;
//export default HomeContainer