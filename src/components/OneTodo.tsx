/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { useState } from "react";
import { BigOrangeButton, TodoInput, TodoWrapper } from "../ui";
import CheckBox from "../ui/CheckBox";
import { TodoResponse } from "../utils/interfaces";

interface TodoProps {
  todoData: TodoResponse;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, todo: string, isCompleted: boolean) => void;
}

const OneTodo = ({ todoData, deleteTodo, updateTodo }: TodoProps) => {
  const [modMode, setModMode] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>({ ...todoData }.todo);
  const [newCheck, setNewCheck] = useState<boolean>(
    { ...todoData }.isCompleted
  );

  const updateTodoCheck = async (check: boolean) => {
    if (modMode) {
      setNewCheck(check);
    } else {
      alert("수정모드에서만 완료 설정이 가능해요!");
    }
  };

  const updateTodoText = async () => {
    if (modMode) {
      if (
        (newTodo !== "" && newTodo !== todoData.todo) ||
        newCheck !== todoData.isCompleted
      ) {
        console.log(newCheck);

        await updateTodo(todoData.id, newTodo, newCheck);
        setModMode(false);
      } else if (newTodo === "") {
        alert("내용을 입력해주세요!");
      } else {
        setModMode(false);
      }
    } else {
      setModMode(true);
    }
  };

  return (
    <div className="some" css={todostyle}>
      <TodoWrapper isCompleted={todoData.isCompleted}>
        <CheckBox
          type="checkbox"
          checked={newCheck}
          onChange={(e) => updateTodoCheck(e.target.checked)}
        />
        {modMode ? (
          <TodoInput
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            ref={(c) => c?.focus()}
          />
        ) : (
          <p>{todoData.todo}</p>
        )}
      </TodoWrapper>
      <div className="todobuttonWrapper">
        <BigOrangeButton onClick={updateTodoText}>
          {modMode ? "제출" : "수정"}
        </BigOrangeButton>
        {!modMode && (
          <BigOrangeButton onClick={() => deleteTodo(todoData.id)}>
            삭제
          </BigOrangeButton>
        )}
        {modMode && (
          <BigOrangeButton
            onClick={() => {
              setModMode(false);
              setNewCheck(todoData.isCompleted);
              setNewTodo(todoData.todo);
            }}
          >
            취소
          </BigOrangeButton>
        )}
      </div>
    </div>
  );
};

const todostyle = (theme: Theme) => css`
  display: flex;
  width: 100%;
  flex-direction: row;
  background-color: ${theme.colors.primary};
  height: 3rem;
  padding: 0;
  div {
    height: 100%;
  }
  .todobuttonWrapper {
    height: 100%;
    display: flex;
  }
  button {
    font-size: inherit;
    padding: 1rem;
    flex-shrink: 0;
  }
  input[type="checkbox"] {
    flex-shrink: 0;
  }
  input[type="text"] {
    padding: 0.5rem 0rem;
  }
`;

export default OneTodo;
