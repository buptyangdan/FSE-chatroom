var React = require('react');
var DefaultLayout = require('./layout');

var warningPage = React.createClass({
    render : function () {
        return (
            <DefaultLayout title={this.props.title}>
                <h2 className="ui red header">Warning</h2>
                <h4 className="ui red header">{this.props.error}</h4>
                <a href="/"><button className="ui blue button">Back</button></a>
            </DefaultLayout>
        );
    }
});

module.exports = warningPage;