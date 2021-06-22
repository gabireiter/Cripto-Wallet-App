import React,{ Component } from 'react';
import { auth } from '../actions'
import {connect} from 'react-redux';

export default function foo(ComposedClass,reload){
    class AuthenticationCheck extends Component {

        state = {
            loading:true
        }

        UNSAFE_componentWillMount(){
            this.props.dispatch(auth())            
        }

        UNSAFE_componentWillReceiveProps(nextProps){
            this.setState({loading:false})

            if(!nextProps.user.login.isAuth){
                if(reload){
                    //Si reload es true, o sea es un componente reservado
                    this.props.history.push('/login');
                }
            } else {
                //Si reload es false, o sea es el componente de login
                if(reload === false) {
                    this.props.history.push('/user')
                }
            }
        }

        render(){
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }
            return(
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    function mapStateToProps(state){
        return{
            user:state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)

}