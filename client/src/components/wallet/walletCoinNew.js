import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { insertCoin } from '../../actions'
import { Field, reduxForm } from 'redux-form';

class WalletCoinNew extends Component {

    //PRISTINE / DIRTY // TOUCHED / ERROR
    componentDidMount(){

    }


    renderInputField(field){
        //console.log(field)
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return (
            <div className={className}>
                <label>{field.myLabel}</label>
                <input type="text" {...field.input}/>
                <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }

    renderSelectOptions(field){
        //<option value="volvo">Volvo</option>
        //console
        const symbols = this.props.criptos.list.symbols
        return(
            <select {...field.input}>                
                <option key="000" value="">(Select symbol)</option>
                {
                    symbols.map(item => {
                        return(<option  key={item} value={item}>{item}</option>)
                    })
                }                
                {/*<option value="Prueba2">Prueba 2</option>            */}
            </select>
        )
    }

    renderComboField=(field)=>{
        //console.log(field)
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return (
            <div className={className}>
                <label>{field.myLabel}</label>
                {/*<input type="text" {...field.input}/>*/}
                    {this.renderSelectOptions(field)}                                 
                <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }


    renderTextareaField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return(
            <div className={className}>
                <label>{field.myLabel}</label>
                <textarea 
                    {...field.input}
                ></textarea>
                 <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }

    onSubmit(values){
        //console.log(values)
        const userId = this.props.user.login.id
        const newvalues = {
            symbol:values.symbols,
            amount:values.amount,
            userId:userId}
        //console.log(newvalues)
        this.props.insertCoin(newvalues,()=>{            
           this.props.history.push('/user/user-wallet')
        })
    }


    render(){
        return(
            <div className="Form">
                <div className="top">
                    <h3>New Coin</h3>
                    <Link to="/user/user-wallet">Back</Link>
                </div>
                <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                    <Field
                        myLabel="Enter symbol"
                        name="symbols"
                        component={this.renderComboField}                            
                    />                    
                    <Field
                        myLabel="Enter amount"
                        name="amount"
                        component={this.renderInputField}                            
                    />                    

                    <button type="submit" className="blue" >Add Coin to Wallet</button>

                </form>
            </div>
        )                
    }
}

function validate(values, props){
    const errors = {};

    console.log(values)
    if (!values.symbols) {
        errors.symbols = "You must select a symbol"
    } else {
        if (props.criptos.wallet.find(element=>element.symbol===values.symbols)) {
            errors.symbols = "You already have this coin in your wallet"
        }
    }
    if(isNaN(values.amount)){
        errors.amount = "This field must be a number"
    } 

    
    return errors;
}

function mapStateToProps(state){
    //console.log(state)
    //console.log(state.cripto.coin_data)
    return {
        success: state.data,
        criptos: state.cripto        
    }
}


export default connect(
    mapStateToProps,        
    {insertCoin})
    (
        reduxForm({
            validate,
            form:'InsertCoin',
            enableReinitialize: true    
        })
    ( WalletCoinNew)
    )