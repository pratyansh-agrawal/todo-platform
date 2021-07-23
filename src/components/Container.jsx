import React from "react";
import { List, ListItem } from "@material-ui/core";
import ActionItem from "./ActionItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.css';

/*
 * @params todo details, function to map to new state, title-state to which todo belongs
 * @returns The Container component - lists all todos state-wise
 */
const Container = ({ todos, toggleTodoTask, deleteTodo, titleName }) => {
    return (
        <div className={`border-l-4 border-opacity-70 ${titleName === "Todo" ? "border-red-400" : titleName === "Done" ? "border-yellow-400" : "border-green-400"}`}>
            <div className={`w-1/4 sm:w-2/5 bg-black bg-opacity-40 capitalize border-2 border-black border-opacity-30 text-gray-300 text-lg py-2`}>
                {titleName}
            </div>
            <div className={`items-section bg-black bg-opacity-40 text-gray-300 h-96 overflow-y-auto py-4`}>
                <TransitionGroup className="items-section___list">
                    <List className="w-full">
                        {todos && todos.map((todo, index) => (
                            <CSSTransition
                                in={true}
                                timeout={1000}
                                classNames="move"
                                key={`item-${index}`}
                                appear={true}
                                unmountOnExit={true}
                            >
                                <ListItem key={index} dense className="w-full">
                                    <ActionItem todo={todo} index={index} toggleTodoTask={toggleTodoTask} deleteTodo={deleteTodo} titleName={titleName} />
                                </ListItem>
                            </CSSTransition>

                        ))}
                    </List>
                </TransitionGroup>
            </div>
        </div>
    )
};

export default Container;