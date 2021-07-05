import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux'
import {
    getCriptos,
    getUserWallet,
    saveCoinId
} from '../../actions'

//import BookItem from '../widgetsUI/book_item'

class WalletView extends Component {

    state = {
        showShowMore: true,        
    }
    
    componentDidMount(){
        this.props.dispatch(getCriptos())
        this.props.dispatch(getUserWallet(this.props.user.login.id))
        this.interval = setInterval(
            () => {
                this.setState({ time: Date.now() })
                this.props.dispatch(getCriptos())
            }
            , 5000);
    }

    loadCriptos(count,filter){
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

    editCoin = (event) =>{
        const coinid = event.target.parentNode.attributes.coinid.nodeValue

        console.log(coinid)
        this.props.dispatch(saveCoinId(coinid))
        this.props.history.push(`/user/edit-wallet-coin`)//?id:${coinid}`)
    }

    calculateTotal = (criptos,wallet)=>{
        var total=0;
        if (wallet && typeof criptos !== "undefined") { 
            // Loop among all the coins of the wallet
            wallet.forEach(item => {
                //I look for the price of the coin
                const coin = criptos.prices.filter(price=>price.symbol===item.symbol+"USDT")[0]
                total+=coin.lastPrice*item.amount
                
            })
        } 
        return (total);
    }

    renderTable(criptos,wallet) {
        const walletTotal=this.calculateTotal(criptos,wallet).toFixed(2)
        return(
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Qty</th>
                        <th>Price (USD)</th>
                        <th>Total (USD)</th>
                        <th>%Wallet</th>
                        <th>Last 24h</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.renderCriptos(criptos,wallet,walletTotal)
                    }
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                        {
                            walletTotal
                        }
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tbody>                
            </table>
        )
    }

    renderCriptos = (criptos,wallet,walletTotal)=>{
        //console.log(criptos)
        //console.log(wallet)
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
                            parseFloat(item.amount)//.toFixed(9)
                        }                        
                    </td>
                    <td>
                        {                            
                            parseFloat(coin.lastPrice).toFixed(2)
                        }
                    </td>
                    <td>
                        {                            
                            parseFloat(coin.lastPrice*item.amount).toFixed(2)
                        }
                    </td>
                    <td>
                        {                            
                            parseFloat(coin.lastPrice*item.amount/walletTotal*100).toFixed(2)+"%"
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
                    <td>
                        <div to="" style={{color: 'red'}} coinid={item._id} onClick={this.deleteCoin}>
                            <FontAwesome name='minus-circle' size = '2x'/>
                        </div>
                    </td>
                    <td>
                        <div to="" style={{color: 'green'}} coinid={item._id} onClick={this.editCoin}>
                            <FontAwesome name='edit' size = '2x'/>
                        </div>
                    </td>
                </tr>
            )})
        :null
    }

    render() {
        const criptos = this.props.criptos.list        
        const wallet = this.props.criptos.wallet
        //console.log(this.props)
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
    console.log(state)
    return {
        criptos: state.cripto
    }
}

export default connect(mapStateToProps)(WalletView) ;
//export default HomeContainer