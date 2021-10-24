import React from 'react';
import { Avatar } from 'components';
import { Row } from 'reactstrap';

const ContactHeader = (props) => (
    <Row className="heading">
        <div className="avatar-contact">
            <Avatar src={props.user.avatar} />
        </div>
        <div id="contact-title">Contacts</div>
        <div className="mr-auto" onClick={props.toggle}>
            <div className="heading-bars">
                <i className="fa fa-bars" />
            </div>
        </div>
    </Row>
);

export default ContactHeader;
