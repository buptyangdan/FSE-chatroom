var React = require('react');
var DefaultLayout = require('./layout');

var index = React.createClass({
    render : function() {
        return (
            <DefaultLayout title={this.props.title}>
                <div className="ui piled segment" id="index">
                    <h2 className="ui center aligned icon header">
                        <i className="circular users icon"></i>
                        SSNoC Keep Safe, Stay Connected
                    </h2>
                    <a href="/users/login"><button className="ui primary button">Login</button></a>
                </div>
            </DefaultLayout>
            );
    }
});

module.exports = index;