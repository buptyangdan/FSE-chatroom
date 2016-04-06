var React = require('react');
var DefaultLayout = require('./layout');
var PostList = require('./postlist');
var Navbar = require('./navbar');
var display_value = 'none';

var chatsPage = React.createClass({
    render : function () {
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow} />
                <PostList data={this.props.posts} usernow={this.props.usernow} to_user={this.props.to_user}/>
                <form id="newPost1" name="newPost" method="post" action={this.props.action} className="ui form">
                    <div className="field">
                        <label>Content</label>
                        <input id="inputContent" type="text" placeholder="content" name="content"></input>
                    </div>
                    <button type="submitButton" className="ui blue button">Submit</button>
		    <div id="hidden_target_name" style={{display:display_value}}>{this.props.to_user}</div>
                    <div id="fromId" style={{display:display_value}}>{this.props.fromId}</div>
                    <div id="toId" style={{display:display_value}}>{this.props.toId}</div>
                </form>
            </DefaultLayout>
        );
    }
});

module.exports = chatsPage;
