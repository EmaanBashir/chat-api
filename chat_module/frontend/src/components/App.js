import React from 'react';
import ReactDOM from 'react-dom';
import ChatBox from './ChatBox'
import UserBox from './UserBox'
import '../App.css'


function App(){
        const thread_id = JSON.parse(document.getElementById('thread_id').textContent);
        return(
                <div className="container py-5 px-4">
                    <div className="row rounded-lg overflow-hidden shadow">
                        <UserBox thread_id = {thread_id}/>
                        <div id='room-message' className = "col-7 px-0">
                            <ChatBox thread_id = {thread_id} />
                        </div>
                    </div>
                </div>
        )
}

export default App