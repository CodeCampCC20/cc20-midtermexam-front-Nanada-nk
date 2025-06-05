/** @format */

import { useState } from "react";
import todoApi from "../api/todoApi";
import { schemaTodo } from "../validator/schemaTodo";
import * as Yup from "yup";
import InputForm from "./form/InputForm";
import { SaveIcon } from "lucide-react";
import { Settings } from "lucide-react";
import { X } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import useAuthStore from "../stores/authStore";
import { toast } from "react-toastify";


const initialInput = {
  taskName: "",
};

function ShowTodoEdit({ item, actionFetchTodo, handleDelete }) {
  const [input, setInput] = useState({
    completed: item.completed || false,
    taskName: item.taskName || "",
  });
  const [inputError, setInputError] = useState(initialInput);
  const [isEdit, setIsEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAuthStore((state) => state.userId) || 14;
  // console.log("userId from store:", userId);
  
  const handleCheckboxChange = async (e) => {
    try {
      const { checked } = e.target;
      console.log("checked", checked);
      setIsLoading(true);

      const data = {
        taskName: item.taskName,
        completed: checked,
      };
      console.log("data", data);

      await todoApi.updateTodo(item.id, 14, data);
      actionFetchTodo();
    } catch (error) {
      console.log("Checkbox ShowtoEdit update error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleClickSave = async (id) => {

  try {
    schemaTodo.validateSync(input, { abortEarly: false });
    setIsLoading(true);

    await todoApi.updateTodo(id, userId, input);
    await actionFetchTodo();
    setIsEdit(null);

    toast.success("Edit success!!");
  } catch (error) {
    console.log("handleClickSave error", error);
    toast.error("Edit invalid");

    if (error instanceof Yup.ValidationError) {
      const err = error.inner.reduce((acc, cur) => {
        acc[cur.path] = cur.message;
        return acc;
      }, {});
      setInputError(err);
    }
  } finally {
    setIsLoading(false);
  }
};




  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center gap-4">
          <LoaderCircle className="w-5 h-5 animate-spin" strokeWidth={2.5} />
          <span className="text-pink-500 font-bold text-sm">LOADING ...</span>
        </div>
      ) : (
        <div className=" flex justify-center items-center gap-1">
          <div className="flex items-center gap-2 bg-pink-100 rounded-2xl w-full p-2 mb-2">
            {isEdit === item.id ? (
              <InputForm
                name="taskName"
                placeholder="new task"
                handleChange={handleInputChange}
                error={inputError.taskName}
                value={input.taskName}
                type="text"
              />
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={handleCheckboxChange}
                />
                <p
                  className={`overflow-auto w-full text-sm ${
                    item.completed ? "line-through" : "no-underline"
                  }`}>
                  {item.taskName}
                </p>
              </>
            )}
            <X
              onClick={() => handleDelete(item.id)}
              className="h-4 w-4 cursor-pointer text-pink-700"
            />
          </div>

      
          {isEdit === item.id ? (
            <SaveIcon
              onClick={() => handleClickSave(item.id)}
              className="h-4 w-4 mb-2 cursor-pointer text-pink-700 "
            />
          ) : (
            <Settings
              onClick={() => {
                setIsEdit(item.id);
                setInput({
                  // id: item.id,
                  // taskName: item.taskName,
                  taskName: item.taskName,
                  completed: item.completed,
                });
              }}
              className="h-4 w-4 mb-2 cursor-pointer text-pink-700"
            />
          )}
        </div>
      )}
    </>
  );
}

export default ShowTodoEdit;
