var React = require('react');
var DefaultLayout = require('./layout');
var AnnouncementList = require('./announcementList');
var Navbar = require('./navbar');

var AnnouncementForm = React.createClass({
    render : function() {
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow} />
                <form id="announcementForm" name="announcementForm" method="POST" action={this.props.action} className="ui large form">
                    <h3 className="ui header">Post Announcement</h3>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="idea icon" />
                            <input type="text" placeholder="Announcement" name="content" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="home icon" />
                            <input type="text" placeholder="Location" name="location" />
                        </div>
                    </div>
                    <button type="submit" className="ui fluid teal submit button">Submit</button>
                    <a href="/main"><button className="ui red button">Cancel</button></a>
                </form>
                <AnnouncementList data={this.props.announcements}/>
            </DefaultLayout>
        );
    }
});

module.exports = AnnouncementForm;