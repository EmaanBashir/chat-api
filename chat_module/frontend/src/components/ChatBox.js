import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import TypingArea from './TypingArea';

class ChatBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            messages: [],
            page: 1,
            hasMore: false,
        }
    }

    chatSocket = new ReconnectingWebSocket(
        'ws://'
        + window.location.host
        + '/ws/chat/t'
        + this.props.thread_id
        + '/'
    );

    getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
    }

    current_user_id = JSON.parse(document.getElementById('current_user_id').textContent);

    fetchMessages = () => {
        fetch('http://localhost:8000/api/fetch-messages/t' + this.props.thread_id + 'u' + this.current_user_id + '/?page=' + this.state.page)
        .then(response => response.json())
        .then(
            data => {
                this.setState({page: this.state.page + 1});
                data.next ? this.setState({hasMore: true}) : this.setState({hasMore: false});
                this.setState({messages:[...data.results.reverse(), ...this.state.messages]});
            }
        )
    }

    saveMessage = (message) => {
        var csrftoken = this.getCookie('csrftoken')

        fetch('http://localhost:8000/api/create-message/', {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(message)
        })
    }

    markAsRead = () => {
         fetch('http://localhost:8000/api/mark-as-read/t' + this.props.thread_id + 'u' + this.current_user_id + '/')
    }

    appendData = () => {
        if (this.state.hasMore){
            this.fetchMessages();
        }

    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    onClick = (e) => {
        e.preventDefault();
        var message = this.state.value;
        this.setState({value: ''});
        this.chatSocket.send(JSON.stringify({
            'message': message,
        }));
    }

    handleScroll =  (e) => {
        if(! e.target.scrollTop){
            this.appendData();
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        if(prevProps.thread_id == this.props.thread_id &&
        prevState.messages != this.state.messages){
            return this.chatLog.scrollHeight - this.chatLog.scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(snapshot)
            this.chatLog.scrollTop = this.chatLog.scrollHeight - snapshot;
    }

    componentDidMount(){
        this.fetchMessages();

        this.chatSocket.onopen = () => {
            console.log('Connected');
        }

        this.chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const message = JSON.parse(data.message);
            if (message.msg.trim()) {

                this.setState({messages: [...this.state.messages,
                {
                    sender:{
                        id: message.user_id,
                        username: message.username
                    },
                    thread:{
                        id: this.props.thread_id,
                        thread_type: message.thread_type
                    },
                    msg: message.msg,
                    created_at: new Date()
                }
                ]});

                if(message.user_id == this.current_user_id){
                    this.saveMessage({
                        sender: message.user_id,
                        thread: this.props.thread_id,
                        msg: message.msg,
                        read_by: [message.user_id],
                    });
                }else{
                    this.markAsRead();
                }

            }
        }

        this.chatSocket.onclose = () => {
            console.error('Chat socket closed unexpectedly');
        }
    }

    render(){
        const msgs = this.state.messages.map((message, index) => {
                var url = "https://avatars.dicebear.com/api/male/" + JSON.parse(message.sender.id) + ".svg";
            return (
                <Message key = {index}
                    sent = {message.sender.id == this.current_user_id}
                    sender = {message.thread.thread_type == 'personal' ? '' : message.sender.username}
                    msg = {message.msg}
                    created_at = {message.created_at}
                    img_url = {url}
                />
        )
    });


        return (
            <>
                <div id="chat-log" ref = {e => {this.chatLog = e}} className="px-4 py-5 chat-box bg-white"  onScroll={(e) => this.handleScroll(e)}>
                    {msgs}
                </div>
                <TypingArea value = {this.state.value} onClick = {(e) => this.onClick(e)} onChange = {(e) => this.onChange(e)}/>
            </>
        )
    }
}

export default ChatBox




