import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from 'reactstrap';
import { Error } from 'components';
import axios from 'axios';
import Auth from 'Auth';

class Register extends React.Component {
    state = { name: '', userName: '', password: '', error: '' };

    /**
     * Change form handler
     * @param e
     */
    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
            error: null,
        });

    /**
     * Form submit handler.
     * @param e
     */
    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            name: this.state.name,
            userName: this.state.userName,
            password: this.state.password,
        };
        axios
            .post('api/auth/register', data)
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
                    <h5 className="md-4 p-5">Create a new Account</h5>
                    <Error error={this.state.error} />
                    <Input
                        value={this.state.name}
                        name="name"
                        onChange={this.onChange}
                        placeholder="Name..."
                        required
                        autoFocus
                    />
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
                        Create
                    </Button>
                    <small>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            Login
                        </Link>
                    </small>
                    <p className="m-3 text-muted">&copy; 2021 - 2022</p>
                </Form>
            </Card>
        );
    }
}

export default Register;
