var React = require('react');
var DefaultLayout = require('./layout');
var UserList = require('./userlist');
var Navbar = require('./navbar');
var PostList = require('./postlist');

var mainPage = React.createClass({
    render : function () {
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow} /> 
                <h2 className="ui header" style={{margin: 'auto', width: '400px'}}>UserList</h2>
                <h3 className="ui header" style={{margin: 'auto', width: '400px'}}>
                  Welcome <p style={{color: 'red', display: 'inline'}}>{this.props.usernow}</p>, never lose your hope!
                </h3>
                <div className="ui divider"></div>
                <UserList data={this.props.users} />
            </DefaultLayout>
        );
    }
});

module.exports = mainPage;