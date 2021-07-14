import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { insertUser, saveLoginMessage } from '../../actions';
import { Field, reduxForm } from 'redux-form';


class Register extends PureComponent {

    state ={
        message:''
    }
        
    renderInputField(field){
        const className = `form_element ${field.meta.touched && field.meta.error ? 'has-error':''}`;
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

    renderPasswordField(field){
        const className = `form_element ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return (
            <div className={className}>
                <label>{field.myLabel}</label>
                <input type="password" {...field.input}/>
                <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }

    onSubmit(values){
        const newvalues = {
            email: values.email,
            password: values.password1,
            name: values.name,
            lastname: values.lastname
        }
        this.props.insertUser(newvalues,(data)=>{
            if (data.success) {
                this.props.dispatch(saveLoginMessage(`Welcome ${newvalues.name} !!! You have been registered correctly. Please Login`))
                this.props.history.push('/login')
            } else {
                this.setState({message:data.message})
            }            
        })
    }


    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <div style={{color: 'red'}}>
                    {this.state.message}
                </div>
                <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                    <Field
                        myLabel="Enter name"
                        name="name"
                        component={this.renderInputField}                            
                    />                    
                    <Field
                        myLabel="Enter lastname"
                        name="lastname"
                        component={this.renderInputField}                            
                    />
                    <Field
                        myLabel="Enter Email"
                        name="email"
                        component={this.renderInputField}                                                
                    />
                    <Field
                        myLabel="Enter Password"
                        name="password1"
                        component={this.renderPasswordField}                                                
                    />
                    <Field
                        myLabel="Repeat Password"
                        name="password2"
                        component={this.renderPasswordField}                                                
                    />
                    <div className="error">
                        {this.state.error}
                    </div>
                    <button type="submit" className="blue" >Register</button>
                </form>                
            </div>
        );
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validate(values, props){
    const errors = {};

    if (values.name==="") {
        errors.name = "You must enter your name"
    }
    if (values.lastname==="") {
        errors.lastname = "You must enter your lastname"
    }
    if(!validateEmail(values.email)){
        errors.email = "You must enter your email"
    } 
    if(values.password1!==values.password2 && 
        values.password1!=="undefined" && 
        values.password2!=="undefined"
        ){
        errors.password2 = "Passwords are different"
    }
   
    return errors;
}

// export const asyncValidate = (values, dispatch) => {

//     return new Promise((resolve, reject) => {
//       dispatch({
//         type: CHECK_EMAIL_AVAILABILITY,
//         promise: client => axios.post('/api/check_user_availability?', values),
//       }).then((result) => {
//           console.log(result)
//         if (result.data.code !== 200) reject({username: 'That username is taken'});
//         else resolve();
//       });
//     });
//   };

function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(
    mapStateToProps,        
    {insertUser})
    (
        reduxForm({
            validate,
            //asyncValidate,
            form:'Register',
            enableReinitialize: true    
        })
    ( Register)
    )
