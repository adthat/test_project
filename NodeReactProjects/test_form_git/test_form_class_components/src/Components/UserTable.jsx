import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@material-ui/core";

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.usrArray = this.props.users;
    // alert("constructor");
    // this.state = {
    //   usrArray: this.props.users
    // };
    // this.setState((this.state.usrArray = this.props.users));
  }
  //alert("lll");
  handleDeleteRow = id => {
    // alert("handleDeleteRow");
    this.props.deleteUser(id);
    // this.setState((this.state.usrArray = this.props.users));
    //this.setState(this.state.usrArray);
  };
  handleEditRow = id => {
    //alert("handleEditRow" + id);
    this.props.editUser(id);
  };

  componentDidMount() {
    alert("ComponentDidMount-UserTable");
  }
  render() {
    this.usrArray = this.props.users;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.usrArray.length > 0 ? (
              this.usrArray.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => this.handleDeleteRow(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => this.handleEditRow(user.id)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Elements</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default UserTable;
