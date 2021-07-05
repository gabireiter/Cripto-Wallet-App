import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCoin } from '../../actions'
import { Field, reduxForm } from 'redux-form';

class WalletCoinEdit extends Component {

    //PRISTINE / DIRTY // TOUCHED / ERROR

    renderInputField(field){
        console.log(field)
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
        console.log(this.props)
        //return(null)
        
        var coin        
        
        if (this.props.criptos) {
            //const coin_id = this.props.criptos.coin_data._id
            //coin = this.props.criptos.wallet.find(
            //    element=>element._id===coin_id
            //    )       
            coin = this.props.criptos.coin_data
            //console.log(this.props.criptos) 
            //console.log(coin_id)             
            return(
                <div className="Form">
                    <div className="top">
                        <h3>Edit Coin</h3>
                        <Link to="/">Back</Link>
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

                        <button type="submit">Update</button>

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

    if(!isNaN(values.Amount)){
        errors.Amount = "This field must be a number"
    } else {
        errors.Amount = "This field is a number"
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
    {updateCoin}
    )
    (
        reduxForm({
            validate,
            form:'UpdateCoin',
            enableReinitialize: true    
        })
    ( WalletCoinEdit)
    )

// export default reduxForm({
//     validate,
//     form:'UpdateCoin',
//     enableReinitialize: true    
// })(
//     connect(
//         mapStateToProps,        
//         {updateCoin})( WalletCoinEdit)
// )