import React, { Component } from "react";
import firebaseApp from "./firebase/Firebase";
import { CardImg } from "reactstrap";
// import Nodemailer from "./nodemailer";
// import { Container } from "reactstrap";

class Emailpage extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef =   firebaseApp
      .database()
      .ref("messages")
      .orderByKey()
      .limitToLast(100);
    messagesRef.on("child_added", snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */

    const userInfo = {
      name: this.name.value,
      company: this.company.value,
      email: this.email.value,
      phone: this.phone.value,
      message: this.message.value
    };

    firebaseApp
      .database()
      .ref("messages")
      .push(userInfo)
      .then(() => this.props.history.push("/"))
      .catch(err => console.log("ERROR", err));
  }
  render() {
    return (
      <div>
        <div id="Contact-body">
          <div className="container">
            <h1 className="brand">
              <center>
                <span>Welcome To Ms.Asha Braids Contact Page</span>
              </center>
            </h1>
            <div className="wrapper">
              <div className="company-info">
                <h3>Ms.Asha Info</h3>
                <ul>
                  <li>
                    <i className="fa fa-road" /> 8626 West Kingman Street
                  </li>
                  <li>
                    <i className="fa fa-phone" /> (602) 419-0457
                  </li>
                  <li>
                    <i className="fa fa-envelope" /> Eddiemiamen@gmail.com
                    <CardImg
                      top
                      width="100%"
                      src="https://scontent.fphx1-1.fna.fbcdn.net/v/t1.0-9/22308755_2075232436032943_6559977583423871244_n.jpg?oh=6d8d8e32fb83d69c9176969e41d92931&oe=5ACA0D91"
                      alt="Card image cap"
                    />
                  </li>
                </ul>
              </div>
              <div className="contact">
                <h3>Email Us</h3>
                <div className="alert">Your message has been sent</div>
                <form onSubmit={this.addMessage.bind(this)} id="contactForm">
                  <p>
                    <label id="form-label">Name</label>
                    <input
                      type="text"
                      ref={el => (this.name = el)}
                      name="name"
                      id="name"
                      required
                    />
                  </p>
                  <p>
                    <label id="form-label">Company</label>
                    <input
                      type="text"
                      ref={el => (this.company = el)}
                      name="company"
                      id="company"
                    />
                  </p>
                  <p>
                    <label id="form-label">Email Address</label>
                    <input
                      type="email"
                      ref={el => (this.email = el)}
                      name="email"
                      id="email"
                      required
                    />
                  </p>
                  <p>
                    <label id="form-label">Phone Number</label>
                    <input
                      ref={el => (this.phone = el)}
                      type="text"
                      name="phone"
                      id="phone"
                    />
                  </p>
                  <p className="full">
                    <label id="form-label">Message</label>
                    <textarea
                      ref={el => (this.message = el)}
                      name="message"
                      rows="5"
                      id="message"
                    />
                  </p>
                  <p className="full">
                    <button id="form-label" type="submit">Submit</button>
                  </p>
                  <ul>
                    {/* Render the list of messages */
                    this.state.messages.map(message => (
                      <li key={message.id}>{message.text}</li>
                    ))}
                  </ul>
                </form>
              </div>
              {/* <Nodemailer /> */}
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}
export default Emailpage;
