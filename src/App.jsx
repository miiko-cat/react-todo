import { useState } from 'react';
import { CompleteTodos } from './components/CompleteTodos';
import { IncompleteTodos } from './components/IncompleteTodos';
import { InputTodo } from './components/InputTodo';
import './styles.css';

export const App = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (e) => setTodoText(e.target.value);

  const onClickAdd = () => {
    if (todoText === '') return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText('');
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    moveTask(index, 'COMPLETE');
  };

  const onClickBack = (index) => {
    moveTask(index, 'BACK');
  };

  const moveTask = (index, flag) => {
    const newIncompleteTodos = [...incompleteTodos];
    const newCompleteTodos = [...completeTodos];

    if (flag === 'COMPLETE') {
      newIncompleteTodos.splice(index, 1);
      newCompleteTodos.push(incompleteTodos[index]);
    } else if (flag === 'BACK') {
      if (incompleteTodos.length < 5) {
        newIncompleteTodos.push(completeTodos[index]);
        newCompleteTodos.splice(index, 1);
      }
    }

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: 'red' }}>
          登録できるtodoは５個までです。
          <br />
          未完了のタスクを削除してください。
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
