import { Button, Form, Input, Result } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import { AppState } from '../store';
import { LoginForm } from '../types/user';
import api from '../utils/dist/api';
import showError from "../utils/showError";
import showSuccess from '../utils/showSuccess';

function Login() {
    const history = useHistory();
    const location = useLocation<{ newSignUp?: boolean }>();

    console.log(location);
    const dispatch = useDispatch();
    const {data,loading,error} = useSelector((state : AppState)=>state.user);
    const onFinish = (values : LoginForm) => {
        dispatch(login(values));
    }
    useEffect(()=> {
        error && showError(error);
    },[error]);

    useEffect(() => {
        data.username && showSuccess("You have successfully logged in!");
    },[data.username]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            history.push("/");
        }
    },[data]);

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <h1 style={{ textAlign: "center" , marginBottom : 20}}>Login</h1>
            {location.state?.newSignUp && (
                <Result
                    status="success"
                    title="You successfully signed up!"
                    subTitle="Please login using your credentials."
                />
            )}
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                
            </Form.Item>
        </Form>
    );
}

export default Login;