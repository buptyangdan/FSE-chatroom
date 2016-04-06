var React = require('react');
var display_value = 'none';
var Navbar = React.createClass({
    render: function(){
        return (
            <div className="ui inverted menu">
                <a className="active red item" id="usernow">{this.props.usernow}</a>
                <a className="item" href="/main">Main</a>
                <a className="item" href="/announcement">Announcement</a>
                <a className="item" href="/users/status">Share Status</a>
                <a className="item" href="/chats">Public Chatroom</a>
                <a className="item" href="/search">Search</a>
                <a className="item" href="/users/logout" id="logout">Logout</a>
                <a className="item" href="/performance">Performance</a>
                <div id="noti_Container">
                    <img src="/images/rourou.jpg"/>
                    <div id="note">0</div>
                </div>
                <div id="hidden_from_name" style={{display:display_value}}>{this.props.usernow}</div>
            </div>
        )
    }
});

module.exports = Navbar;
