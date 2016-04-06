var React = require('react');
var DefaultLayout = require('./layout');

var LoginForm = React.createClass({
    render : function() {
        return (
            <DefaultLayout title={this.props.title}>
                <div className="ui middle aligned center aligned grid">
                    <div className="column">
                        <h2 className="ui teal image header">
                            <img src="/images/plumber.jpg" className="image" />
                            <div className="content">Welcome to SSNoc</div>
                        </h2>
                        <form id={this.props.name} method="post" action={this.props.method} className="ui large form">
                            <div className="ui stacked segment">
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="user icon" />
                                        <input type="text" placeholder="username" name="username"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="lock icon" />
                                        <input type="password" placeholder="password" name="password" />
                                    </div>
                                </div>
                                <button type="submit" className="ui fluid large teal submit button">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
});


module.exports = LoginForm;