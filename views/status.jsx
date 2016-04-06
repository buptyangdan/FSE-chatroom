var React = require('react');
var DefaultLayout = require('./layout');
var Navbar = require('./navbar');
var StatusForm = require('./statusform');

var StatusPage = React.createClass({
    render : function() {
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow}/>
                <StatusForm name={this.props.name} method={this.props.method} />
            </DefaultLayout>
        );
    }
});

module.exports = StatusPage;
