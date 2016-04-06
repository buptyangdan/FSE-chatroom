var React = require('react');

var AnnouncementList = React.createClass({
    render : function(){
        var announcementNode = this.props.data.map(function(announcement){
            return (
                <tr>
                    <td>{announcement.User.username}</td>
                    <td>{announcement.content}</td>
                    <td>{announcement.timestamp}</td>
                    <td>{announcement.location}</td>
                </tr>
            );
        });
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Content</th>
                        <th>Time</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>{announcementNode}</tbody>
            </table>
        );
    }
});

module.exports = AnnouncementList;