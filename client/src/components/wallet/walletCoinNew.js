import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCoin } from '../../actions'
import { Field, reduxForm } from 'redux-form';

class WalletCoinNew extends Component {

    //PRISTINE / DIRTY // TOUCHED / ERROR

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

    renderComboField(field){
        //console.log(field)
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return (
            <div className={className}>
                <label>{field.myLabel}</label>
                {/*<input type="text" {...field.input}/>*/}
                <select {...field.input}>                    
                </select>
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
        this.props.insertCoin(values,()=>{            
           this.props.history.push('/user/user-wallet')
        })
    }


    render(){
        return(
            <div className="Form">
                <div className="top">
                    <h3>New Coin</h3>
                    <Link to="/">Back</Link>
                </div>
                <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>

                    <Field
                        myLabel="Enter symbol"
                        name="symbol"
                        component={this.renderInputField}                            
                    />                    
                    <Field
                        myLabel="Enter amount"
                        name="amount"
                        component={this.renderInputField}                            
                    />                    

                    <button type="submit">Update</button>

                </form>
            </div>
        )                
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
    console.log(state)
    console.log(state.cripto.coin_data)
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
    ( WalletCoinNew)
    )