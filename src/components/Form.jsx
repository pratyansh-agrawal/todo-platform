import React, { useState } from "react";

/*
 * @params saveTodo function for saving a new todo
 * @returns The input field component
 */
const Form = ({ saveTodo }) => {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        saveTodo(value);
        setValue("");
      }}
    >
      <div className="inline-flex w-1/4 rounded-lg pb-12 ">
        <input
          className={
            "bg-black bg-opacity-40 text-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none h-8 w-full px-2"
          }
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder=" + Add action item here..."
          onKeyDown={(event) => {
            //Set the value of input to be null on submission
            if (event.key === "Enter") {
              event.target.value = "";
            }
          }}
        />
      </div>
    </form>
  );
};

export default Form;
