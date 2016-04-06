var React = require('react');
var DefaultLayout = require('./layout');
var Navbar = require('./navbar');
var StatusForm = require('./statusform');
var display_value = 'none';

var ProfilePage = React.createClass({
    // 	    <DefaultLayout title={this.props.title}>
    // <Navbar usernow={this.props.usernow}/>
    // 	    </DefaultLayout>
    render : function() {
	var uploadInput = <input id="picture" type="file" name="userPhoto" disabled={this.props.readonly}/>;
	var submitButton = <button type="submit" className="login btn btn-primary" disabled={this.props.readonly} id="submit">Save</button>;
	var picture = "";
	var selected0 = false;
	var selected1 = false;
	var selected2 = false;
	var selected3 = false;
	switch(this.props.status){
	case 0:
	    selected0 = true;
	    break;
	case 1:
	    selected1 = true;
	    break;
	case 2:
	    selected2 = true;
	    break;
	case 3:
	    selected3 = true;
	    break;
	default:
	    console.log(this.props.status);
	}
	var css = ".profileImg {width: 50%; height: 50%;}";

	if (this.props.readonly){
	    uploadInput = "";
	    submitButton = "";
	}
	if (this.props.picture != null){
	    var url = "/uploads/" + this.props.picture;
	    picture = <a className="image-popup-no-margins" href={url}><img className="profileImg" src={url} /></a>
	}
	    
	return (
		<html>
		<head>
		<meta charset="utf-8"></meta>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
		<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
		<title>SSNoc Profile</title>
		<link rel="stylesheet" href="../../stylesheets/bootstrap.min.css"></link>
		<link rel="stylesheet" href="../../stylesheets/magnific-popup.css"></link>
		<script type="text/javascript" src="../js/jquery-2.2.3.min.js"></script>
		<script type="text/javascript" src="../js/jquery.magnific-popup.min.js"></script>
		<script type="text/javascript" src="../js/jquery.magnific-popup.js"></script>
		<script type="text/javascript" src="../js/profile.js"></script>
		<script type="text/javascript" src="../js/bootstrap.min.js"></script>
		<style>{css}</style>
		</head>
		<body>
		<div className="container">
		<div className="page-header">
		<h1>{this.props.username}</h1>
		</div>

		<div id="hidden_from_name" style={{display:display_value}}>{this.props.usernow}</div>
		<div id="hidden_target_name" style={{display:display_value}}>{this.props.to_user}</div>
		<div id="fromId" style={{display:display_value}}>{this.props.fromId}</div>
		<div id="toId" style={{display:display_value}}>{this.props.toId}</div>
		
		<form id="profileForm" method="post" role="form" className="login-form form-horizontal" encType="multipart/form-data" action="/api/photo">
		<input name="_csrf" type="hidden"/>
		
		<div className="form-group">
		<label className="col-sm-4">First Name</label>
		<div className="col-sm-8">
		<input id="firstName" placeholder="Your first name" required="required" name="firstName" type="text" className="form-control" readOnly={this.props.readonly} value={this.props.firstName}/>
		</div>
		</div>
		
		<div className="form-group">
		<label className="col-sm-4">Last Name</label>
		<div className="col-sm-8">
		<input id="lastName" placeholder="Your last name" required="required" name="lastName" type="text" className="form-control" readOnly={this.props.readonly} value={this.props.lastName}/>
		</div>
		</div>

		<div className="form-group">
		<label className="col-sm-4">Status</label>
		<div className="col-sm-8">
		<select className="form-control" id="status" disabled={this.props.readonly}>
		<option value="3" selected={selected3}>Please select one status</option>
		<option value="0" selected={selected0}>I am OK now.</option>
		<option value="1" selected={selected1}>Emergency</option>
		<option value="2" selected={selected2}>Help Me!</option>
		</select>
		</div>
		</div>
		
		<div className="form-group">
		<label className="col-sm-4">Address</label>
		<div className="col-sm-8">
		<input id="address" placeholder="e.g. NASA" name="address" type="text" className="form-control" readOnly={this.props.readonly} value={this.props.address}/>
		</div>
		</div>
		
		<div className="form-group">
		<label className="col-sm-4">Occupation</label>
		<div className="col-sm-8">
		<input id="occupation" placeholder="e.g. Firefighter" name="occupation" type="text" className="form-control" readOnly={this.props.readonly} value={this.props.occupation}/>
		</div>
		</div>
		
		<div className="form-group">
		<label className="col-sm-4">Useful Skill(s)</label>
		<div className="col-sm-8">
		<input id="skills" placeholder="e.g. AR" name="skills" type="text" className="form-control" readOnly={this.props.readonly} value={this.props.skills}/>
		</div>
		</div>

		<div className="form-group">
		<label className="col-sm-4">Picture</label>
		<div className="col-sm-8">
		{picture}
	    {uploadInput}
	    </div>
		</div>

		<div className="form-group">
		<div className="col-sm-offset-4 col-sm-8">
		{submitButton}
	    </div>
		</div>
		</form>

		<div className="pull-right"><a href="/">Return to home page</a></div>
		</div>
		</body>
		</html>
	);
    }
});

module.exports = ProfilePage;
