import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class CreateGroup extends Component{

    constructor(props){
        super(props);
        this.state = {
            members: [],
            groupName: ''
        }
    }

    current_user_id = JSON.parse(document.getElementById('current_user_id').textContent);
    users = [];

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

    onChange = (e) => {
        this.setState({ groupName: e.target.value });
    }

    onSelect = (user) => {
        if(this.state.members.includes(user)){
            this.setState({members: this.state.members.filter(member => member != user)});
        }else{
            this.setState({members: [...this.state.members, user]});
        }
    }

    onClose = () => {
        this.setState({members: this.state.members.filter(user => user.id == this.current_user_id)});
        this.setState({groupName: ''});
    }

    onCreate = () => {
        if(this.state.members.length && this.state.groupName){
            var group = {
                name: this.state.groupName,
                thread_type: "group",
                users: this.state.members.map(member => member.id)
            }
            this.createGroup(group);
            this.closeButton.click();
        }else{
            console.log('empty');
        }
    }

    fetchUsers = () => {
        fetch('http://localhost:8000/api/fetch-users/')
        .then(response => response.json())
        .then(
            data => {
                this.setState({members: data.filter(user => user.id == this.current_user_id)});
                this.users = data.filter(user => user.id != this.current_user_id);
            }
        )
    }

    createGroup = (group) => {console.log(JSON.stringify(group));
        var csrftoken = this.getCookie('csrftoken')

        fetch('http://localhost:8000/api/create-thread/', {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(group)
        })
    }

    componentDidMount(){
        this.fetchUsers();
    }

    render(){
        const list = this.users.map((user, index) => {
            if(this.state.members.includes(user)){
                var divClass = "list-group-item list-group-item-action list-group-item-light rounded-0 active";
            }else{
                var divClass = "list-group-item list-group-item-action list-group-item-light rounded-0";
            }
            return (
                <div key = {index} className = {divClass}
                      onClick = {() => this.onSelect(user)}>
                    <img src={"https://avatars.dicebear.com/api/male/" + user.id + ".svg"}
                                alt="user" width="50" className="rounded-circle" />
                    &nbsp;{user.username}
                </div>
        )
    });

        return (
<>
<button type="button" className="btn btn-light ml-3" data-toggle="modal" data-target="#usersList">
  <i className="fa fa-plus" aria-hidden="true"></i>
</button>


<div className="modal fade" id="usersList" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-scrollable " role="document">
    <div className="modal-content">
      <div className="modal-header">
        <input type="text" placeholder="Enter group name" aria-describedby="button-addon2"
              className="form-control rounded-0 border-0 py-4 bg-light" autoComplete = "off"
              value = {this.state.groupName} onChange = {(e) => this.onChange(e)}/>
        <button type="button" className="close" onClick = {() => this.onClose()} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {list}
      </div>
      <div className="modal-footer">
        <button ref = {e => {this.closeButton = e}} type="button" className="btn btn-secondary" onClick = {() => this.onClose()} data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick = {() => this.onCreate()}>Create</button>
      </div>
    </div>
  </div>
</div>
</>
        )
    }
}

export default CreateGroup