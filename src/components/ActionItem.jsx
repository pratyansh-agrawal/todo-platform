import React, { useState, useEffect } from "react";
import {
  Checkbox,
  IconButton
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

/*
 * @params todo details, function to map to new state, title-state to which todo belongs
 * @returns The component to show todo in Container
 */
const ActionItem = ({ todo, index, toggleTodoTask, deleteTodo, titleName }) => {

  const timeout = (ms) => {
    return new Promise(res => setTimeout(res,ms));
  }

  const [isChecked, setIsChecked] = useState(false);

  //Animation hook - provides delay for animation to complete
  useEffect(() => {
    if(isChecked) {
      setTimeout(() => {
        setIsChecked(false);
      }, 500)
    }
  }, [isChecked])
  return (
      <div className={`w-full flex flex-row border-b-2 border-opacity-40 justify-around ${titleName === "Todo" ? "border-red-400" : titleName === "Done" ? "border-yellow-600" : "border-green-400"}`}>
        {(titleName === "Todo" || titleName === "In Progress") && <div className="self-center text-gray-300">
          <Checkbox
            checked={isChecked}
            color="primary"
            tabIndex={-1}
            onClick={async () => { setIsChecked(true); await timeout(500); toggleTodoTask(index);}}
          />
        </div>}
        <div className={`w-10/12 px-2 truncate overflow-ellipsis self-center ${isChecked ? "line-through": ""}`} title={todo.text}>
          {todo.text}
        </div>

        <IconButton
          aria-label="Delete"
          onClick={async () => {
            await timeout(500);
            deleteTodo(index);
          }}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </div>
  );
};

export default ActionItem;
