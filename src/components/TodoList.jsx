import React, { useState } from "react";
import "../componentsStyles/TodoList.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export const TodoList = () => {
  let [toDoList, setToDoList] = useState([]);
  let saveToDoList = (event) => {
    event.preventDefault();
    let toDoInput = event.target.toDoInput.value.trim();
    if (toDoInput === "") {
      NotificationManager.error(`Can't Add Empty Task.`);
    } else if (!toDoList.includes(toDoInput)) {
      let finalTodoList = [...toDoList, toDoInput];
      setToDoList(finalTodoList);
      NotificationManager.info(`New Task Added.`);
    } else {
      NotificationManager.error(`You Can't Add Same Task.`);
    }
  };

  let lists = toDoList.map((value, index) => {
    return (
      <ToDoListItems
        listValue={value}
        key={index}
        indexNumber={index}
        toDoList={toDoList}
        setToDoList={setToDoList}
      />
    );
  });

  return (
    <>
      <div>
        <h1 onClick={() => NotificationManager.info(`Developed By Chandan`)}>
          Todo List - React
        </h1>
        <form onSubmit={saveToDoList}>
          <input type="text" name="toDoInput" autoComplete="off" />
          <button>S A V E</button>
        </form>
        <div className="listItems">
          <ul>{lists}</ul>
        </div>
      </div>

      {/* for notifications, reference - https://www.npmjs.com/package/react-notifications?activeTab=readme */}
      <NotificationContainer />
    </>
  );
};

let ToDoListItems = ({ listValue, indexNumber, toDoList, setToDoList }) => {
  let [status, setStatus] = useState(false);

  let deleteList = (event) => {
    event.stopPropagation();
    let finalListData = toDoList.filter((value, index) => {
      return index !== indexNumber;
    });
    setToDoList(finalListData);
    NotificationManager.error(`Task Deleted Successfully.`);
  };

  let checkStatus = () => {
    setStatus(!status);
    if (!status) {
      NotificationManager.success(`Task Status "Completed."`);
    } else {
      NotificationManager.warning(`Task Status "Pending."`);
    }
  };

  return (
    <li className={status ? "todo-completed" : ""} onClick={checkStatus}>
      {indexNumber + 1}. {listValue} <span onClick={deleteList}>&times;</span>
    </li>
  );
};
