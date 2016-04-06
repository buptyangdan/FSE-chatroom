var React = require('react');

var DefaultLayout = React.createClass({
    render : function(){
        return (
            <html>
            <head>
                <title>{this.props.title}</title>
                <link rel="stylesheet" href="../../stylesheets/style.css"></link>
                <link rel="stylesheet" href="../../semantic/dist/semantic.css"></link>
                <script type="text/javascript" src="../js/jquery.min.js"></script>
                <script type="text/javascript" src="../semantic/dist/semantic.js"></script>
		<script type="text/javascript" src="../js/jquery.cookie.js"></script>
                <script type="text/javascript" src="../js/moment.min.js"></script>
                <script type="text/javascript" src="../socket.io/socket.io.js"></script>
                <script type="text/javascript" src="../js/private.js"></script>

            </head>
            <body>
                {this.props.children}
            </body>
            </html>
        );
    }
});

module.exports = DefaultLayout;
