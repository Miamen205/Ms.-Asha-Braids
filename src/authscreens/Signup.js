import React, { Component } from 'react';
import { Link } from 'react-router';
import * as firebase from 'firebase';
import firebaseApp from '../firebase/Firebase';
import isEmail from 'validator/lib/isEmail';

class Signup extends Component {
	constructor(props) {
    	super(props);
    	this.state = {email: "", password:""};
    	//
    	this.handleEmailChange = this.handleEmailChange.bind(this)
    	this.handlePassChange = this.handlePassChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
   handlePassChange(e) {
    this.setState({password: e.target.value});
  }
	handleSubmit(e) {
	    e.preventDefault();
	    var email = this.state.email.trim();
	    var password = this.state.password.trim();
      if(isEmail(email)){
  	    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  		    // Handle Errors here.
  		    var errorMessage = error.message;
  		    alert("errorMessage: "+ errorMessage)
  		  });
      }else{
        alert("Email Address in not valid");
      }  
  }
  handleFacebook(e) {
    e.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      console.log('Facebook login success')
    }).catch(function(error) {
      var errorMessage = error.message;
      alert("Facebook sign in error: "+ errorMessage);
    });
  }
   handleGoogle(e) {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      console.log('Google login success')
    }).catch(function(error) {
      var errorMessage = error.message;
      alert("Google sign in error: "+ errorMessage);
    });
  }

  render() {
    return (
      <div className="Signup">
         <div className="container">
         <h1 className="brand">
         <center>
         <span id="login-span"> Sign up</span>
        </center>
        </h1>
        <div id="sign-up-form" className="wrapper">
        <div className="col-md-4"></div>
          <div className="form-group col-md-4">
            <a className="btn btn-block btn-social btn-facebook" onClick={this.handleFacebook}>
              <span className="fa fa-facebook"></span>
              Sign in with Facebook
            </a>
            <a className="btn btn-block btn-social btn-google" onClick={this.handleGoogle}>
              <span className="fa fa-google"></span>
              Sign in with Google
            </a>
            </div>
          <p className="text-center"></p>
          <div className="sign-up-form">
          <form onSubmit={this.handleSubmit}>
          <label id="form-label">Email Address</label>
          	<input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
            <label id="form-label">Password</label>
          	<input type="password" className="form-control" value={this.state.password} onChange={this.handlePassChange} placeholder="Enter Password" /><br/>
          	<button id="submit-button" type="submit" className="btn btn-default">Submit</button>
          </form>  
          	<br/>
        	<p id="Already-Signed-up">Already Signed up? <Link to="/login">Log In</Link></p>
        </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Signup;
