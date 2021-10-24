import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from 'reactstrap';
import { Error } from 'components';
import axios from 'axios';

class Password extends React.Component {
    state = { password: '', newPassword: ''};

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
            error: null,
        });

    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            password: this.state.password,
            newPassword: this.state.newPassword,
        };
        axios
            .post('api/account/password', data)
            .then((res) => {
                this.props.history.push('/');
            })
            .catch((err) => {
                // this.setState({ error: err.response.data.message });
                console.log(err.response)
            });
    };

    render() {
        return (
            <Card className="auth col-lg-3 col-sm-6">
                <Form onSubmit={this.onSubmit}>
                    <h5 className="md-4 p-5">Edit the Password</h5>
                    <Error error={this.state.error} />
                    <Input
                        type="password"
                        value={this.state.password}
                        name="password"
                        onChange={this.onChange}
                        placeholder="Type the current Password..."
                        required
                    />
                    <Input
                        type="password"
                        value={this.state.newPassword}
                        name="newPassword"
                        onChange={this.onChange}
                        placeholder="Type the new Password..."
                        required
                    />
                    <Button color="primary" className="mb-3 w-100">
                        Edit
                    </Button>
                    <small>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            back
                        </Link>
                    </small>
                    <p className="m-3 text-muted">&copy; 2021 - 2022</p>
                </Form>
            </Card>
        );
    }
}

export default Password;
