import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Content</th>
          <th>Due date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {todos.map(id => <TodoItem key={id} id={id} />)}
      </tbody>
    </table>
  );
}
