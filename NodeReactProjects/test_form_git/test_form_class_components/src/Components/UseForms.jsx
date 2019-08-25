import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

class UseForms extends React.Component {
  constructor(props) {
    super(props);
    alert("constructor-UseForms");
    this.state = {
      user: { id: null, name: "", address: "", email: "" }
    };

    //u1.binds(this.u1);
  }
  componentWillReceiveProps() {
    alert("componentWillReceiveProps-Userform");
    console.log("componentWillReceiveProps");
    console.log(this.props);
    // if (this.props.currUser !== null) this.state.user = this.props.currUser;
    // else {
    //   console.log("currUser null");
    //   this.state.user = { id: null, name: "", address: "", email: "" };
  }
  componentWillUpdate(nextProps, nextState) {
    alert("componentWillUpdate-Userform");
    console.log("componentWillUpdate");
    console.log(this.props);
    console.log(nextProps);
    if (nextProps !== null && nextProps.currUser !== null)
      this.state.user = nextProps.currUser;
    else this.state.user = { id: null, name: "", address: "", email: "" };
    // // //this.setState(this.state.user);
  }
  componentDidMount() {
    alert("ComponentDidMount-Userform");
  }
  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log("name" + event.target.name);
    console.log("value" + event.target.value);
    var u1 = {};

    this.state.user[event.target.name] = event.target.value;

    this.setState(this.state.user);
    console.log(this.state.user);
    // alert("handleInputChange");
  };
  handleSubmitForm = event => {
    alert("handleSubmitForm");
    event.preventDefault();
    this.props.addUser(this.state.user);
    this.state.user = { id: null, name: "", address: "", email: "" };
  };
  render() {
    alert("render userform");

    return (
      <div>
        <form onSubmit={this.handleSubmitForm}>
          <div>
            <InputLabel>Name:</InputLabel>
            <InputBase
              margin="normal"
              variant="outlined"
              type="text"
              name="name"
              value={this.state.user.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <InputLabel>Address:</InputLabel>
            <InputBase
              margin="normal"
              variant="outlined"
              type="text"
              name="address"
              value={this.state.user.address}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <InputLabel>Email:</InputLabel>
            <InputBase
              margin="normal"
              variant="outlined"
              type="email"
              name="email"
              value={this.state.user.email}
              onChange={this.handleInputChange}
            />
          </div>
          <Button type="submit">submit</Button>
        </form>
      </div>
    );
  }
}
export default UseForms;
