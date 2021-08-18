import { Redirect, Route } from "react-router";
import SignUp from "./components/SignUp";
import { Layout } from 'antd';
import Login from "./components/Login";
import Categories from "./components/Categories";
import PrivateRoute from "./components/PrivateRoute";
import Records from "./components/Records";
import HeaderComp from "./components/HeaderComp";
import Logout from "./components/Logout";
import React, { Fragment } from "react";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <HeaderComp/>
      <Content className="site-layout" style={{ padding: '50px', marginTop: 64 }}>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/records" component={Records} />
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>Expense Tracker</Footer>
    </Layout>
    
  );
}

export default App;
