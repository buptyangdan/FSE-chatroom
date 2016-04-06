var React = require('react');
var DefaultLayout = require('./layout');
var Navbar = require('./navbar');

var resultPage = React.createClass({
    render : function () {
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow} />
                <h2 className="ui red header">Result</h2>
                <h4 className="ui red header">{this.props.gCount}</h4>
                <h4 className="ui red header">{this.props.pCount}</h4>
            </DefaultLayout>
        );
    }
});

module.exports = resultPage;