import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginUser, clearLoginMessage} from '../../actions'

class Login extends Component {

    state = {
        email:'',
        password:'',
        error:'',
        success:false
    }

    componentDidMount(){
        setTimeout(() => {            
            this.props.dispatch(clearLoginMessage())            
        }, 5000);
    }

    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user')
        }
    }

    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    render() {
        let user = this.props.user;
        console.log('ccc')
        console.log(this.props)
        const message = this.props.message
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>

                    <div style={{color: 'green'}}>{message}</div>

                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="Enter your mail"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit">Log in</button>

                    <div className="error">
                    {
                        user.login ? 
                            <div>{user.login.message}</div>
                        :null                        
                    }
                    </div>

                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log('bbb')
    console.log(state)
    return {
        user:state.user,
        message: state.cripto.message
    }
}

export default connect(mapStateToProps)(Login)

