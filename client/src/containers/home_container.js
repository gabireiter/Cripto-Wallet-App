import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCriptos} from '../actions/index'
import { Link } from 'react-router-dom';
import moment from 'moment-js';

//import BookItem from '../widgetsUI/book_item'

class HomeContainer extends Component {

    componentDidMount(){
        this.loadmore()
    }

    showCriptos = (criptos)=>{
        console.log(criptos)
        return criptos ? 
            criptos.symbols.map((item,i) => {
                const coin = criptos.prices.filter(price=>price.symbol===item+"USDT")[0]
                return (
                <tr key={i}>
                    <td>
                        <Link to={
                            `/user/edit-post/${item._id}`
                        }>
                            {item}
                        </Link></td>
                    <td>
                        {                            
                            parseFloat(coin.lastPrice).toFixed(2)
                        }
                    </td>
                    <td>
                        {
                            coin.priceChangePercent
                        //moment(item.createdAt).format("DD/MM/YYYY")

                        }
                    </td>
                </tr>
            )})
        :null
    }

    loadmore = (filter)=>{
        //console.log(filter)
        let count;
        if (filter === "") {
            count = 10000;
        } else {
            if (this.props.criptos.list) {
                count = this.props.criptos.list.limit+3;
            } else {
                count = 3
            }
        }
         //let list //= this.props.criptos.list;
         //console.log("jjj")
        //console.log(count)
        //console.log(this.props.criptos.list)
        this.props.dispatch(getCriptos(0,count,filter))
    }

    renderTitle() {
        return(
            <h4>Main Cripto Coins</h4>
        )
    }

    renderSearch() {
        return(
            <div>
            <h2>Search: </h2>
            <input type="text" onChange={event => this.loadmore(event.target.value)}/>
            </div>
        )
    }

    renderTable(criptos) {
        return(
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.showCriptos(criptos)
                    }
                </tbody>
            </table>
        )
    }

    render() {
        const criptos = this.props.criptos.list        
        //console.log(this.props)
        return (
            <div>
                <div className="user_posts">
                    {this.renderTitle()}
                    {this.renderSearch()}
                    {this.renderTable(criptos   )}                
                </div>                
                <div className="loadmore" onClick={this.loadmore}>
                    Load More
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

export default connect(mapStateToProps)(HomeContainer) ;
//export default HomeContainer