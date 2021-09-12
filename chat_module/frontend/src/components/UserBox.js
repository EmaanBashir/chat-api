import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ChatLink from './ChatLink';
import Search from './Search'

class UserBox extends Component{

    constructor(props){
        super(props);
        this.state = {
            threads: [],
            value: ''
        }
    }

    current_user_id = JSON.parse(document.getElementById('current_user_id').textContent);

    fetchThreads = () => {
        fetch('http://localhost:8000/api/fetch-threads/' + this.current_user_id + '/')
        .then(response => response.json())
        .then(
            data => this.setState({threads:data})
        )
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    componentDidMount(){
        this.fetchThreads();
        setInterval(() => this.fetchThreads(), 500);
    }

    render(){
        const chats = this.state.threads.map((thread, index) => {
            var chat = thread.thread_type == 'personal' ?
                            (this.current_user_id == thread.users[0].id ?
                             thread.users[1] : thread.users[0])
                                : thread;
            var name = thread.thread_type == 'personal' ? chat.username : chat.name;
             return name.toLowerCase().includes(this.state.value.toLowerCase()) ?
                (
                    <ChatLink key = {thread.id}
                        id = {thread.id}
                        name = {name}
                        updated_at = {thread.updated_at}
                        msg = {thread.last_msg ? thread.last_msg.msg : ''}
                        count = {thread.unread_count}
                        sender = {thread.last_msg ? thread.last_msg.sender : ''}
                        img_url = {"https://avatars.dicebear.com/api/male/" + chat.id + ".svg"}
                        active = {this.props.thread_id == thread.id}
                    />
                ) : ''

    })

        return (
            <div className="col-5 px-0">
                <div className="bg-white">

                    <div className="bg-gray px-3 pt-2 pb-1 bg-light">
                        <Search value = {this.state.value} onChange = {(e) => this.onChange(e)}/>
                    </div>
                    <div className="messages-box">
                        <div className="list-group rounded-0" id = "user-log">
                            {chats}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserBox

