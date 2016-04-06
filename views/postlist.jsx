var React = require('react');

var PostList = React.createClass({
    render : function(){
        var usernow = this.props.usernow
        var postNode = this.props.data.map(function(post){
            return (
                    <div className="comment">
                        <a className="avatar">
                            {(() => {
                                switch (post.User.status) {
                                    case 0:  return (<img className="ui avatar image" src="/images/ok.png"/>);
                                    case 1:  return (<img className="ui avatar image" src="/images/help.png"/>);
                                    case 2:  return (<img className="ui avatar image" src="/images/danger.png"/>);
                                    default: return (<img className="ui avatar image" src="/images/unset.png"/>);
                                }
                            })()}
                        </a>
                        <div className="content">
                            <a className="author">
                                { post.User.username == usernow.username ? 'me':post.User.username }
                            </a>
                            <div className="metadata">
                                <span className="date">{post.timestamp}</span>
                            </div>
                            <div className="text">
                                <div className="ui left pointing green basic label">{post.content}</div>
                            </div>
                        </div>
                    </div>
                );
        });
        return (
            <div className="ui comments" id="chats">
                <div class="inline field">
                    <h3 className="ui dividing header">{ this.props.to_user ? 'Chatting With  ' + this.props.to_user : 'Public Chatroom'}</h3>
                    <div className="ui left pointing green basic label">Welcome, Have a nice day ;)</div>
                </div>
                {postNode}
            </div>
        );
    }
});

module.exports = PostList;
