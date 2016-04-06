var React = require('react');
var DefaultLayout = require('./layout');
var PostList = require('./postlist');
var Navbar = require('./navbar');

var chatsPage = React.createClass({
    render : function () {
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow} />
                <PostList data={this.props.posts} usernow={this.props.usernow} to_user={this.props.to_user}/>
                <form id="newPost" name="newPost" method="post" action={this.props.action} className="ui form">
                    <div className="field">
                        <label>Content</label>
                        <input id="inputContent" type="text" placeholder="content" name="content"></input>
                    </div>
                    <button type="submit" className="ui blue button">Submit</button>
                </form>
                <script type="text/javascript" src="http://127.0.0.1:3000/js/formEmit.js"></script>
            </DefaultLayout>
        );
    }
});

module.exports = chatsPage;