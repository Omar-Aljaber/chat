import React from 'react';
import { withRouter } from 'react-router-dom';
import Auth from 'Auth';
import { Avatar } from 'components';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    UncontrolledDropdown,
} from 'reactstrap';
import moment from 'moment';

const ChatHeader = (props) => {
    const logout = () => {
        Auth.logout();
        props.history.push('/');
    };

    const status = () => {
        if (props.typing) return 'typing...';
        if (props.contact.status === true) return 'online';
        if (props.contact.status) return moment(props.contact.status).fromNow();
    };

    return (
        <div className="heading m-0">
            <div onClick={props.toggle}>
                <Avatar src={props.contact.avatar} />
            </div>
            <div className="heading-name">
                <div>{props.contact ? props.contact.name : ''}</div>
                <small>{status()}</small>
            </div>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="nav-link">
                        <i className="fa fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={e => props.history.push('/password')}>Edit Password</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={logout}>logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </div>
    );
};

export default withRouter(ChatHeader);
