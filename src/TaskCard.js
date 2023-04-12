import React, { Component } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";

class TaskCard extends Component {
  render() {
    const { task, onUpdate, onDelete, onToggleComplete } = this.props;
    return (
      <Row className="align-items-center my-2 text-center">
        <Col>{task.title}</Col>
        <Col>{task.description}</Col>
        <Col>{task.deadline}</Col>
        <Col>{task.priority}</Col>
        <Col>
          <input type="checkbox" checked={task.isComplete} onChange={() => onToggleComplete(task.id)}/>
        </Col>
        <Col>
          <ButtonGroup>
            {!task.isComplete && (
              <Button size="sm" className="update-button" onClick={() => onUpdate(task)}>
                <i className="bi bi-pencil-square icon-space action-icon"></i>
                UPDATE
              </Button>
            )}
            <Button size="sm" style={{ marginLeft: "10px" }} className="delete-button" onClick={() => onDelete(task.id)}>
              <i className="bi bi-x-circle-fill icon-space action-icon"></i>
              DELETE
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

export default TaskCard;


