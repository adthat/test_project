import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UseForms from "./Components/UseForms";
import UserTable from "./Components/UserTable";
import axios from "axios";
import { async } from "q";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isEditing: false,
      currentUser: null
    };
    this.getData();
  }
  getData = async setUsrArray => {
    //alert("HI");
    // const response = await axios("http://localhost:8080/", {
    //   headers: { "Access-Control-Allow-Origin": "*" }
    // });
    const response = await axios("http://localhost:8080/");
    //console.log(response);
    const body = await response.data;
    console.log(body);
    this.state.users = body.arr;
    this.setState(this.state.users);
  };
  componentDidMount() {
    alert("ComponentDidMount-App");
  }
  getDataForSingleUser = async id => {
    const response = await axios("http://localhost:8080/" + id);
    //console.log(response);
    const body = await response.data;
    console.log("getDataForSingleUser" + body);
  };
  editUser = id => {
    this.state.isEditing = true;
    this.state.currentUser = this.state.users.find(user => user.id == id);
    console.log(this.state.currentUser);
    this.setState(this.state.currentUser);

    //this.setState((this.state.isEditing = true));
    //this.setState(this.setState.users);
    // this.putData(this.state.currentUser);
    // this.getData();
    alert("edituser" + this.state.currentUser.id);
  };
  deleteUser = id => {
    //alert(`deleteUser ${id}`);
    console.log("id" + id);
    //this.deleteData(id);
    this.getDataForSingleUser(id);
    this.state.users = this.state.users.filter(u => u.id !== id);
    this.setState(this.state.users);
    console.log(this.state.users);
  };

  putData = user => {
    axios.post("http://localhost:8080/", { user: user }).then(res => {
      console.log("Post reply" + res.data);
    });
  };
  deleteData = id => {
    axios.delete("http://localhost:8080/", { id: id }).then(res => {
      console.log("delete reply" + res.data);
    });
  };
  addUser = user => {
    if (user === null) {
      alert("null user can not be added");
      return;
    }
    console.log("adduser" + user);
    if (this.state.currentUser !== null) {
      this.state.users.map(u => (u.id === user.id ? user : u));
      this.state.currentUser = null;
      this.setState(this.state.currentUser);
    } else {
      user.id = this.state.users.length + 1;

      //this.state.users.push(user);
    }
    this.putData(user);
    this.getData();
    //this.state.isEditing = false;
    //this.setState(this.state.isEditing);
    this.setState(this.state.users);
    console.log(this.state.users);
  };
  render() {
    alert("render app" + this.state.currentUser);
    return (
      <div className="container">
        <h1>Please enter details</h1>
        <UseForms
          addUser={this.addUser}
          isEditing={this.state.isEditing}
          currUser={this.state.currentUser}
        />
        <UserTable
          users={this.state.users}
          deleteUser={this.deleteUser}
          editUser={this.editUser}
        />
      </div>
    );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
