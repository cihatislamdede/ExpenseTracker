import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../actions/userActions';
import { AppState } from '../store';

function HeaderComp() {
  const  {data,loading,error} = useSelector((state:AppState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const { pathname } = useLocation();

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        {data.username ? (
          <React.Fragment>
            <Menu.Item key="/records">
              <Link to="/records">Records</Link>
            </Menu.Item>
            <Menu.Item key="/categories">
              <Link to="/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </React.Fragment>
        ) : 
          
          <React.Fragment>
            <Menu.Item key="/login">
            <Link to="login">Login</Link>
          </Menu.Item>
          <Menu.Item key="/signup">
            <Link to="signup">Sign Up</Link>
          </Menu.Item>
          </React.Fragment>
        }
      </Menu>
    </Header>
  );
}

export default HeaderComp;