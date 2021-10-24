import React from 'react';
// import { Row } from 'reactstrap';
import { Avatar } from 'components';

const UserProfile = (props) => (
    <div className={props.open ? 'side-profile open' : 'side-profile'}>
        <div className="heading">
            <div className="mr-2 heading-arrow" onClick={props.toggle}>
                <i className="fa fa-arrow-left" />
            </div>
            <div>{props.contact.name}</div>
        </div>
        <div className="d-flex flex-column overflow-auto">
            <Avatar src={props.contact.avatar} />
            <div className="bg-white px-3 py-2">
                <label className="text-muted">Status message</label>
                <p>
                    {props.contact.about
                        ? props.contact.about
                        : 'Hey there! I am using MyChat'}
                </p>
            </div>
        </div>
    </div>
);

export default UserProfile;
