var React = require('react');
var DefaultLayout = require('./layout');
var Navbar = require('./navbar');

var searchView = React.createClass({
    render : function() {
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow} />
                <form id="searchForm" className="ui large form" action={this.props.action} >
                    <div className="ui large input">
                        <input type="text" id="criteria" name="criteria" placeholder="Search..." />
                        <select id="pid" name="type" className="ui large selection dropdown">
                            <option value="username">Username</option>
                            <option value="announcement">Announcement</option>
                            <option value="public chat">Public Message</option>
                            <option value="private chat">Private Message</option>
                        </select>
                        <button type="submit" className="ui large button">Search</button>
                    </div>
                </form>
                <div className="ui center aligned segment">
                    <h3>Quick search by status:</h3>
                    <form id="statusForm1" className="ui form" action={this.props.action}>
                        <input type="hidden" name="status" value="OK"/>
                        <button type="submit" className="ui primary button">OK</button>
                    </form>
                    <form id="statusForm2" className="ui form" action={this.props.action}>
                        <input type="hidden" name="status" value="Help"/>
                        <button type="submit" className="ui primary button">HELP</button>
                    </form>
                    <form id="statusForm3" className="ui form" action={this.props.action}>
                        <input type="hidden" name="status" value="Urgent"/>
                        <button type="submit" className="ui primary button">Urgent</button>
                    </form>
                </div>
                <table id="search-table" className="ui celled table"></table>
                <button id="loadButton" className="ui button">Show More</button>
                <script src="../../js/search.js"></script>
            </DefaultLayout>
        );
    }
});

module.exports = searchView;