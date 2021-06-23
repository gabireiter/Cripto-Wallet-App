import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/home';
import BookView from './components/books'
import Layout from './hoc/layout'
import Login from './containers/admin/login'
import User from './components/admin'   
import AddReview from './containers/admin/add'   
import UserPosts from './components/admin/userposts';
import EditReview from './containers/admin/edit';
import Register from './containers/admin/register'
import Logout from './components/admin/logout'

import Auth from './hoc/auth'

const Routes = () => {
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Auth(Home,null)}/>
                    <Route path="/login" component={Auth(Login,false)}/>
                    <Route path="/user/logout" exact component={Auth(Logout,true)}/>
                    <Route path="/user" exact component={Auth(User,true)}/>
                    <Route path="/user/add" exact component={Auth(AddReview,true)}/>
                    <Route path="/user/register" exact component={Auth(Register,true)}/>
                    <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true)}/>
                    <Route path="/books/:id" component={Auth(BookView)}/>                    
                    <Route path="/user/user-wallet" exact component={Auth(UserPosts,true)}/>
                </Switch>
            </Layout>
        )
}

            

export default Routes;