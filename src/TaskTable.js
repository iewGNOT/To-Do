import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TaskCard from "./TaskCard";

class TaskTable extends Component {
  render() {
    const { tasks, openTaskDialog, delTask, toggleComplete } = this.props;
    return (
      <Container fluid>
        <Row className="align-items-center my-2 text-center">
          <Col>Title</Col>
          <Col>Description</Col>
          <Col>Deadline</Col>
          <Col>Priority</Col>
          <Col>Is Complete</Col>
          <Col>Action</Col>
        </Row>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={openTaskDialog} onDelete={delTask} onToggleComplete={toggleComplete}/>
        ))}
      </Container>
    );
  }
}

export default TaskTable;
