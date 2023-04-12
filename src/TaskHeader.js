import React, { Component } from "react";
import { Button } from "react-bootstrap";

class TaskHeader extends Component {
  render() {
    const { openTaskDialog } = this.props;
    return (
      <header className="App-header">
        <div className="App-content">
          <i className="bi bi-list App-header-icon"></i>
          <h1 className="title">FRAMEWORKS</h1>
        </div>
        <Button style={{ marginRight: "10px" }}  onClick={() => openTaskDialog(null)} className="add-button">
          <i className="bi bi-plus-circle-fill"></i>
          <strong> ADD </strong>
        </Button>
      </header>
    );
  }
}

export default TaskHeader;
