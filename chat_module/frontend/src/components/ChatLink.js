import React, {Component} from 'react';
import ReactDOM from 'react-dom';


function ChatLink(props){
    var current_user_id = JSON.parse(document.getElementById('current_user_id').textContent);
    var unread_messages = props.count > 0 ? (<span className ="circle-unread text-white">{props.count}</span>) : '';
    var a_class = props.active ? "list-group-item list-group-item-action active text-white rounded-0" :
                            "list-group-item list-group-item-action list-group-item-light rounded-0";

    return (
        <a

        className={a_class}

                    href = {"http://localhost:8000/chat/t" + props.id + "/"}

                    id = {props.id} >



                    <div className="media">
                            <img
                                src={props.img_url}
                                alt="user" width="50" className="rounded-circle"
                            />
                        <div className="media-body ml-4">
                            <div className="d-flex align-items-center justify-content-between mb-1">
                                <h6 className="mb-0">
                                    {props.name}
                                </h6>



                                <small className="small font-weight-bold">{props.msg ? new Date(props.updated_at).toLocaleString() : ''}</small>




                            </div>
                            <p className="mb-0 text-small">





                                    <strong>

                                        {props.sender ? (current_user_id == props.sender.id ? 'You' : props.sender.username) : ''}
                                        &nbsp;
                                    </strong>


                                <i>

                                        {props.msg.length > 40 ? props.msg.substring(40, 0) + '...' : props.msg}

                                </i>
                                    &nbsp;



                                    {unread_messages}



                            </p>
                        </div>
                    </div>
                </a>
        )

}

export default ChatLink