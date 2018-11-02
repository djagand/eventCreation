import _ from "lodash";

let database = [];
export const CreateEvent = (req, res, next) => {
  const { eventName, date, description } = req.body;
  if (database.filter(obj => obj.eventName === eventName).length === 0) {
    database.push(req.body);
    return res.status(200).send({
      status: "SUCCESS",
      statusMessage: "Event created",
      events: database
    });
  } else {
    return res.status(200).send({
      status: "ERROR",
      statusMessage: "Event already exists",
      events: database
    });
  }
};

export const DeleteEvent = (req, res, next) => {
  const { eventName } = req.body;
  let unwanted = database.filter(obj => obj.eventName === eventName);
  if (!(unwanted.length === 0)) {
    database = database.filter(db => !unwanted.includes(db));
    return res.status(200).send({
      status: "SUCCESS",
      statusMessage: "Event deleted",
      events: database
    });
  } else {
    return res.status(200).send({
      status: "ERROR",
      statusMessage: "Event doesn't exists",
      events: database
    });
  }
};

export const UpdateEvent = (req, res, next) => {
  const { eventName, date, description } = req.body;
  let modifyData = database.filter(obj => obj.eventName === eventName)[0];
  if (!_.isEmpty(modifyData)) {
    let index = _.findIndex(database, modifyData);
    database.splice(index, 1);
    database.push({ eventName, date, description });
    return res.status(200).send({
      status: "SUCCESS",
      statusMessage: "Event updated",
      events: database
    });
  } else {
    return res.status(200).send({
      status: "ERROR",
      statusMessage: "No such event exists",
      events: database
    });
  }
};

export const GetEvents = (req, res, next) => {
  return res.status(200).send({
    status: "SUCCESS",
    statusMessage: "",
    events: database
  });
};
