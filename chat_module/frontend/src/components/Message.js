import React, {Component} from 'react';
import ReactDOM from 'react-dom';


function Message(props){
    if (props.sent){
        return (
            <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                    <div className="bg-primary rounded py-2 px-3 mb-2">
                        <p className="text-small mb-0 text-white">
                            {props.msg}
                        </p>
                    </div>
                    <p className="small text-muted">{new Date(props.created_at).toLocaleString()}</p>
                </div>
            </div>
        );
    }
    else{
        if(props.sender){
            var sender = props.sender;
        }else{
            var sender = "";
        }
        return (
            <div className="media w-50 mb-3">
                <img src={props.img_url} alt="user"
                    width="50" className="rounded-circle"/>
                <div className="media-body ml-3">
                    <p className="text-muted"><strong>{sender}</strong></p>
                    <div className="bg-light rounded py-2 px-3 mb-2">
                        <p className="text-small mb-0 text-muted">
                            {props.msg}
                        </p>
                    </div>
                    <p className="small text-muted">{new Date(props.created_at).toLocaleString()}</p>
                </div>
            </div>
        );
    }
    }


export default Message