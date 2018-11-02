import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from "lodash";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  componentDidUpdate() {
    this.fetchEvents();
  }

  fetchEvents() {
    let self = this;
    axios
      .post("/api/events", {})
      .then(response => {
        self.setState({
          events: response.data.events
        });
      })
      .catch(error => {
        Promise.reject(error.response.statusText);
      });
  }

  onClick(event) {
    event.preventDefault();
    let self = this;
    const actionType = event.target.value;
    self.setState({ actionType });
    let data = {
      eventName: self.state.eventName,
      date: self.state.date,
      description: self.state.description
    };
    if (_.isEmpty(data.eventName)) {
      self.setState({
        statusMessage: "Event name should not be empty"
      });
      return;
    }
    if (actionType === "create") {
      axios
        .post("/api/createevent", data)
        .then(response => {
          self.setState({
            statusMessage: response.data.statusMessage,
            events: response.data.events
          });
        })
        .catch(error => {
          self.setState({
            statusMessage: error.response.data
          });
          Promise.reject(error.response.statusText);
        });
    } else if (actionType === "delete") {
      axios
        .post("/api/deleteevent", data)
        .then(response => {
          self.setState({
            statusMessage: response.data.statusMessage,
            events: response.data.events
          });
        })
        .catch(error => {
          self.setState({
            statusMessage: error.response.data
          });
          Promise.reject(error.response.statusText);
        });
    } else if (actionType === "update") {
      axios
        .post("/api/updateevent", data)
        .then(response => {
          self.setState({
            statusMessage: response.data.statusMessage,
            events: response.data.events
          });
        })
        .catch(error => {
          self.setState({
            statusMessage: error.response.data
          });
          Promise.reject(error.response.statusText);
        });
    } else {
      self.setState({
        eventName: "",
        date: "",
        description: ""
      });
    }
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  renderEventsTable(events) {
    return (
      <ReactTable
        data={events}
        columns={[
          {
            Header: "Event Name",
            accessor: "eventName"
          },
          {
            Header: "Event Date",
            accessor: "date"
          },
          {
            Header: "Event Description",
            accessor: "description"
          }
        ]}
        defaultPageSize={25}
        style={{
          height: "350px",
          width: "1000px"
        }}
        className="-striped -highlight"
        showPageSizeOptions={false}
      />
    );
  }

  render() {
    return (
      <div className="ui vertical segments">
        <div className="ui segment">
          <form className="ui form">
            Event Name:
            <input
              type="text"
              name="eventName"
              value={this.state.eventName}
              onChange={this.onFieldChange}
            />
            Event Date:
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.onFieldChange}
            />
            Event Description:
            <input
              type="textarea"
              name="description"
              value={this.state.description}
              onChange={this.onFieldChange}
            />
            <Button className="primary" value="create" onClick={this.onClick}>
              Create Event
            </Button>
            <Button className="primary" onClick={this.onClick} value="update">
              Update Event
            </Button>
            <Button className="primary" onClick={this.onClick} value="delete">
              Delete Event
            </Button>
            <Button className="primary" value="reset" onClick={this.onClick}>
              Clear
            </Button>
          </form>
        </div>
        <div className="ui segment">
          <div>{this.state.statusMessage}</div>
        </div>
        <div className="ui segment">
          <div className="fluid">
            {this.renderEventsTable(this.state.events)}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
