import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux'
import {
    getCriptos,
    getUserWallet,
    saveCoinId,
    deleteCoin
} from '../../actions'

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


//import BookItem from '../widgetsUI/book_item'

class WalletView extends Component {

    state = {
        showShowMore: true,        
        open: false,
        openedCoinId: null
    }
        
    handleClickOpen = (event) => {
        const coinid = event.target.parentNode.attributes.coinid.nodeValue

        this.setState(
            { 
                open: true,
                openedCoinId: coinid            
            });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAgree = () => {        
        this.handleClose();
        //console.log("I agree! Do Something");
        //console.log(this.state.openedCoinId)
        this.props.dispatch(deleteCoin(this.state.openedCoinId))
        this.props.dispatch(getUserWallet(this.props.user.login.id))
        this.setState(
            { 
                openedCoinId: ''
            });
        //this.props.dispatch(getCriptos())
    };
    
    handleDisagree = () => {
        //console.log("I do not agree.");
        this.handleClose();
    };

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

    newCoin = ()=>{
        //console.log("nuevo")
        this.props.history.push(`/user/new-wallet-coin`)//?id:${coinid}`)
    }

    calculateTotal = (criptos,wallet)=>{
        var total=0;
        console.log(wallet)
        if (wallet && typeof criptos !== "undefined") { 
            // Loop among all the coins of the wallet
            wallet.forEach(item => {
                //I look for the price of the coin
                const coin = criptos.prices.filter(price=>price.symbol===item.symbol+"USDT")[0]
                if (typeof coin !=='undefined') {
                    console.log(coin)
                    console.log(item.symbol+"USDT")
                    console.log(criptos.prices)
                    total+=coin.lastPrice*item.amount
                }
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

    renderRow = (item, i, coin, walletTotal)=>{
        return(
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
                    <div to="" style={{color: 'red'}} coinid={item._id} onClick={this.handleClickOpen}>
                        <FontAwesome name='minus-circle' size = '2x'/>
                    </div>
                </td>
                <td>
                    <div to="" style={{color: 'green'}} coinid={item._id} onClick={this.editCoin}>
                        <FontAwesome name='edit' size = '2x'/>
                    </div>
                </td>
            </tr>
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
                if (typeof coin!=='undefined') {
                    return (
                        <React.Fragment>
                            {this.renderRow(item,i,coin,walletTotal)}                        
                        </React.Fragment>
                    )}
                    else {
                            return(null)
                        }    
                    }
            )
        :null    
    }

    renderButtonNew() {
        return(
            <div>
                <p></p>
                <button className="blue" onClick={this.newCoin}>New Coin</button>
            </div>
        )
    }

    renderAlertDialogue() {
        return (
          <div>
            {/* Button to trigger the opening of the dialog */}
            {/* <Button onClick={this.handleClickOpen}>Open alert dialog</Button> */}
            {/* Dialog that is displayed if the state open is true */}
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Coin delete confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you confirm to delete this coin from your wallet ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDisagree} color="primary">
                  No
                </Button>
                <Button onClick={this.handleAgree} color="primary" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
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
                    {this.renderButtonNew()}
                    {this.renderAlertDialogue()}
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