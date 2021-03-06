import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/home';
import Layout from './hoc/layout'
import Login from './containers/admin/login'
import Register from './containers/admin/register'
import User from './components/admin'   
import UserWallet from './components/wallet/walletView';
import WalletCoinEdit from './components/wallet/walletCoinEdit';
import WalletCoinNew from './components/wallet/walletCoinNew';
import Logout from './components/admin/logout'

import Auth from './hoc/auth'

const Routes = () => {
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Auth(Home,null)}/>
                    <Route path="/login" component={Auth(Login,false)}/>
                    <Route path="/register" exact component={Auth(Register,false)}/>
                    <Route path="/user/logout" exact component={Auth(Logout,true)}/>
                    <Route path="/user" exact component={Auth(User,true)}/>
                    <Route path="/user/adduser" exact component={Auth(Register,true)}/>
                    <Route path="/user/edit-wallet-coin" exact component={Auth(WalletCoinEdit,true)}/>
                    <Route path="/user/new-wallet-coin" exact component={Auth(WalletCoinNew,true)}/>
                    <Route path="/user/user-wallet" exact component={Auth(UserWallet,true)}/>
                </Switch>
            </Layout>
        )
}

            

export default Routes;