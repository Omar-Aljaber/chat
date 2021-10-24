import React from 'react';
import moment from 'moment';
import { Avatar } from 'components';

const Contact = (props) => (
    <div className="contact">
        <div>
            <Avatar src={props.contact.avatar} />
            {props.contact.status === true ? (
                <i className="fa fa-circle online" />
            ) : (
                ''
            )}
        </div>
        <div className="w-50">
            <div className="name">{props.contact.name}</div>
            <div className="small last-message">
                {props.message ? props.message.content : 'Click here to chat'}
            </div>
        </div>
        <div className="flex-grow-1 text-left">
            <div className="small text-muted">
                {props.message
                    ? moment(props.message.date).format('hh:mm a')
                    : ''}
            </div>
            {props.unseen > 0 ? (
                <div className="unseen">
                    <span className="unseen-num">{props.unseen}</span>
                </div>
            ) : (
                ''
            )}
        </div>
    </div>
);
export default Contact;
