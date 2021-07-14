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
                    //If reload is true, so it's a reserved component
                    this.props.history.push('/login');
                }
            } else {
                //If reload is false, so it's a login componente
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