var React = require('react');
var DefaultLayout = require('./layout');
var Navbar = require('./navbar');

var performancePage = React.createClass({
    render: function(){
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow} />
                <form id="performance" name="performance" method="post" action={this.props.action} className="ui form">
                    <div className="field">
                        <label>Duration(in seconds)</label>
                        <input id="inputDuration" type="text" placeholder="duration" name="duration"></input>
                        <label>Interval(in milliseconds)</label>
                        <input id="inputInterval" type="text" placeholder="interval" name="interval"></input>
                    </div>
                    <button type="submit" className="ui blue button">Submit</button>
                </form>
            </DefaultLayout>
        );
    }
});

module.exports = performancePage;