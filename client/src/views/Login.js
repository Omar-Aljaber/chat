import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from 'reactstrap';
import { Error } from 'components';
import axios from 'axios';
import Auth from 'Auth';

class Login extends React.Component {
    state = { userName: '', password: '', error: '' };

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
            error: null,
        });

    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            userName: this.state.userName,
            password: this.state.password,
        };
        axios
            .post('api/auth', data)
            .then((res) => {
                Auth.login(res.data);
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({ error: err.response.data.message }); //TODO
            });
    };

    render() {
        return (
            <Card className="auth col-lg-3 col-sm-6">
                <Form onSubmit={this.onSubmit}>
                    <h5 className="md-4 p-5">Login</h5>
                    <Error error={this.state.error} />
                    <Input
                        value={this.state.userName}
                        name="userName"
                        onChange={this.onChange}
                        placeholder="User name..."
                        required
                    />
                    <Input
                        type="password"
                        value={this.state.password}
                        name="password"
                        onChange={this.onChange}
                        placeholder="Password..."
                        required
                    />
                    <Button color="primary" className="mb-3 w-100">
                        Login
                    </Button>
                    <small>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            Create a new Account
                        </Link>
                    </small>
                    <p className="m-3 text-muted">&copy; 2021 - 2022</p>
                </Form>
            </Card>
        );
    }
}

export default Login;
