import React, { Component } from "react";
import "./App.css";
import AddTaskDialog from "./AddTaskDialog";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskHeader from "./TaskHeader";
import TaskTable from "./TaskTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showAddTaskDialog: false, tasks: [], taskToUpdate: null,};
  }

  openTaskDialog = (task) => {
    this.setState({ taskToUpdate: task, showAddTaskDialog: true });
  };

  closeAddTaskDialog = () => {
    this.setState({ showAddTaskDialog: false });
  };

  operation = (taskData, isUpdate) => {
    if (isUpdate) {
      this.setState({ tasks: this.state.tasks.map((task) => task.id === taskData.id ? taskData : task),});
      toast.success("Task updated successfully");
    } else {
      const newTaskId = Date.now();
      const taskWithId = { ...taskData, id: newTaskId };
      const updatedTasks = [...this.state.tasks, taskWithId];
      this.setState({ tasks: updatedTasks });
      toast.success("Task added successfully");
    }
    this.closeAddTaskDialog();
  };



  delTask = (taskId) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: updatedTasks });
    toast.success("Task deleted successfully");
  };

  toggleComplete = (taskId) => {
    this.setState({tasks: this.state.tasks.map((task) => task.id === taskId ? { ...task, isComplete: !task.isComplete } : task),});
  };

  render() {
    return (
      <div className="App">
        <TaskHeader openTaskDialog={this.openTaskDialog} />
        <TaskTable tasks={this.state.tasks} openTaskDialog={this.openTaskDialog} delTask={this.delTask} toggleComplete={this.toggleComplete} />
        <AddTaskDialog show={this.state.showAddTaskDialog} onHide={this.closeAddTaskDialog} onTaskOperation={this.operation} tasks={this.state.tasks} taskToUpdate={this.state.taskToUpdate} />
        <ToastContainer position="bottom-right" />
      </div>
    );
  }
}

export default App;


