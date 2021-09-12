import React, {Component} from 'react';
import ReactDOM from 'react-dom';


function TypingArea(props){
        return (
            <form className="bg-light" noValidate onSubmit={(e) => props.onClick(e)}>
                <div className="input-group">
                    <input type="text" placeholder="Type a message" aria-describedby="button-addon2"
                           className="form-control rounded-0 border-0 py-4 bg-light" autoComplete = "off"
                           id="chat-message-input" onChange = {props.onChange}
                           value = {props.value} autoFocus/>
                    <div className="input-group-append">
                        <button id="chat-message-submit" type="submit" className="btn btn-link">
                        <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }


export default TypingArea