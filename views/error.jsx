var React = require('react');
var DefaultLayout = require('./layout');

var errorPage = React.createClass({
    render : function () {
        return (
            <DefaultLayout title={this.props.title}>
                <h1>{this.props.message}</h1>
                <h2>{this.props.error.status}</h2>
            </DefaultLayout>
        );
    }
});

module.exports = errorPage;