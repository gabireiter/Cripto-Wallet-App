import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCoin } from '../../actions'
import { Field, reduxForm } from 'redux-form';

class WalletCoinEdit extends Component {

    //PRISTINE / DIRTY // TOUCHED / ERROR

    renderInputField(field){
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
        this.props.updateCoin(values,()=>{            
           this.props.history.push('/user/user-wallet')
        })
    }


    render(){
        var coin        
        
        if (this.props.criptos) {
            coin = this.props.criptos.coin_data
            
            return(
                <div className="Form">
                    <div className="top">
                        <h3>Edit Coin</h3>
                        <Link to="/user/user-wallet">Back</Link>
                    </div>
                    <div>
                        Coin: {coin.symbol}
                    </div>
                    <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>

                        <Field
                            myLabel="Enter new Amount"
                            name="amount"
                            component={this.renderInputField}                            
                        />                    

                        <button type="submit" className="blue" >Update</button>

                    </form>
                </div>
            )
        } else {
            return(null)
        }
        
    }
}

function validate(values){
    const errors = {};

    if(isNaN(values.amount)){
        errors.amount = "This field must be a number"
    } 
    return errors;
}

function mapStateToProps(state){
    return {
        success: state.data,
        criptos: state.cripto,
        initialValues: state.cripto.coin_data
    }
}


export default connect(
    mapStateToProps,        
    {updateCoin})
    (
        reduxForm({
            validate,
            form:'UpdateCoin',
            enableReinitialize: true    
        })
    ( WalletCoinEdit)
    )
