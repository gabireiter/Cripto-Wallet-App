import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCriptos} from '../actions/index'
import { Link } from 'react-router-dom';

class HomeContainer extends Component {

    state = {
        showShowMore: true,        
    }
    
    componentDidMount(){
        this.loadCriptos(6, "")
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
            <h4>Main Cripto Coins</h4>
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
                        this.renderCriptos(criptos)
                    }
                </tbody>
            </table>
        )
    }

    renderCriptos = (criptos)=>{
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
                        <div style={{color: coin.priceChangePercent>=0 ? "#149414":"#ff0000"}} >
                        {
                            coin.priceChangePercent
                        }
                        </div>
                    </td>
                </tr>
            )})
        :null
    }


    renderShowMore(){
        if (this.state.showShowMore) {
            return(
                <div className="loadmore"  onClick={this.loadmore}>
                    Load More
                </div>
            )
        } else {
            return(null)
        }        
    }

    render() {
        const criptos = this.props.criptos.list        
        return (
            <div>
                <div className="user_posts">
                    {this.renderTitle()}
                    {this.renderSearch()}
                    {this.renderTable(criptos   )}                
                </div>
                {this.renderShowMore()}
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        criptos: state.cripto
    }
}

export default connect(mapStateToProps)(HomeContainer) ;
