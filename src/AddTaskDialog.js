import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./App.css";

class AddTaskDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      deadline: null,
      priority: null,
      titleError: "",
      descriptionError: "",
      deadlineError: "",
      priorityError: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { show, taskToUpdate } = this.props;
    const isEdit = taskToUpdate !== null;

    if (show && prevProps.show !== show) {
      if (isEdit) {
        this.setState({
          title: taskToUpdate.title,
          description: taskToUpdate.description,
          deadline: taskToUpdate.deadline,
          priority: taskToUpdate.priority,
        });
      } else {
        this.setState({
          title: "",
          description: "",
          deadline: null,
          priority: null,
        });
      }
      this.setState({
        titleError: "",
        descriptionError: "",
        deadlineError: "",
        priorityError: "",
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { onTaskOperation, tasks, taskToUpdate } = this.props;
    const { title, description, deadline, priority } = this.state;

    let hasError = false;

    if (!title.trim()) {
      this.setState({ titleError: "Title is required." });
      hasError = true;
    } else {
      this.setState({ titleError: "" });
    }

    if (
      tasks.some(function (task) {
        return task.title === title && task.id !== (taskToUpdate && taskToUpdate.id);
      })
    ) {
      this.setState({ titleError: "Title must be unique." });
      hasError = true;
    } else if (!hasError) {
      this.setState({ titleError: "" });
    }

    if (!description.trim()) {
      this.setState({ descriptionError: "Description is required." });
      hasError = true;
    } else {
      this.setState({ descriptionError: "" });
    }

    if (!deadline) {
      this.setState({ deadlineError: "Deadline is required." });
      hasError = true;
    } else {
      this.setState({ deadlineError: "" });
    }

    if (!priority) {
      this.setState({ priorityError: "Priority is required." });
      hasError = true;
    } else {
      this.setState({ priorityError: "" });
    }

    if (hasError) {
      return;
    }

    const taskData = {
      ...taskToUpdate,
      title,
      description,
      deadline,
      priority,
      isComplete: taskToUpdate?.isComplete || false,
    };
    const isUpdate = taskToUpdate !== null;

    onTaskOperation(taskData, isUpdate);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleDeadlineChange(e) {
    this.setState({ deadline: e.target.value });
  }

  handlePriorityChange(e) {
    this.setState({ priority: e.target.value });
  }

  render() {
    const { show, onHide, taskToUpdate } = this.props;
    const { title,
      description,
      deadline,
      priority,
      titleError,
      descriptionError,
      deadlineError,
      priorityError,
    } = this.state;

    const isEdit = taskToUpdate !== null;

    return (
      <Modal show={show} onHide={onHide} centered>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton className="App-header">
            <div className="App-content">
              {isEdit ? (
                <i className="bi bi-pencil-square icon-space App-header-icon"></i>
              ) : (
                <i className="bi bi-plus-circle-fill App-header-icon"></i>
              )}
              <Modal.Title>{isEdit ? "Edit Task" : "Add Task"}</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            {!isEdit && (
              <Form.Group className="mb-3">
                <Form.Control type="text" value={title} onChange={this.handleTitleChange} isInvalid={!!titleError} placeholder="Title"/>
                <Form.Control.Feedback type="invalid">
                  {titleError}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Control as="textarea" value={description} onChange={this.handleDescriptionChange}
                isInvalid={!!descriptionError}
                placeholder="Description"
              />
              <Form.Control.Feedback type="invalid">
                {descriptionError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="date" value={deadline} onChange={this.handleDeadlineChange} isInvalid={!!deadlineError} placeholder="Deadline"/>
              <Form.Control.Feedback type="invalid">
                {deadlineError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <div className="row">
                <div className="col-md-4">
                  <Form.Check type="radio" label="Low" name="priority" value="low" onChange={this.handlePriorityChange}
                    checked={priority === "low"}
                    isInvalid={!!priorityError}/>
                </div>
                <div className="col-md-4">
                  <Form.Check type="radio" label="Medium" name="priority" value="medium" onChange={this.handlePriorityChange} checked={priority === "medium"}
                    isInvalid={!!priorityError}/>
                </div>
                <div className="col-md-4">
                  <Form.Check type="radio" label="High" name="priority" value="high" onChange={this.handlePriorityChange}
                  checked={priority === "high"}isInvalid={!!priorityError}/>
                </div>
              </div>
              <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                {priorityError}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">
              <i className="bi bi-pencil-square icon-space"></i>
              {isEdit ? "Update" : "Add"}
            </Button>
            <Button className="cancel-button" onClick={onHide}>
              <i className="bi bi-x-circle-fill icon-space"></i>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddTaskDialog;


