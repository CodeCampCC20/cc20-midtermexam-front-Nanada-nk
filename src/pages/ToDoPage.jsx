/** @format */

import { Send } from "lucide-react";
import { Rocket } from "lucide-react";
import InputForm from "../components/form/InputForm";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { schemaTodo } from "../validator/schemaTodo";
import todoApi from "../api/todoApi";
import useAuthStore from "../stores/authStore";
import useTodoStore from "../stores/todoStore";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Settings } from "lucide-react";
import { SaveIcon } from "lucide-react";

const initialInput = {
  taskName: "",
  completed:false,
  userId: 14,
};

function ToDoPage() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  const userId = useAuthStore((state) => state.userId);

  const todoLists = useTodoStore((state) => state.todoLists);
  const actionFetchTodo = useTodoStore((state) => state.actionFetchTodo);

  useEffect(() => {
    actionFetchTodo(userId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(e);
      setIsLoading(true);

      //validate
      schemaTodo.validateSync(input, { abortEarly: false });
      console.log("userId Todo", userId);
      console.log("input Todo", input);
      //api
      const res = await todoApi.createTodo(input, userId);
      console.log("res TodoPage", res.data);
      actionFetchTodo();

      setInput(initialInput);
      //navigate

      //alert
      toast.success("Create task success!!");
    } catch (error) {
      console.log(error);
      toast.error("Create task invalid!!");

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

  const handleDelete = async (id) => {
    try {
      console.log("id handleDelete TodoPage", id);
      await todoApi.deleteTodo(id);
      await actionFetchTodo(id);

      toast.success("Delete success!!");
    } catch (error) {
      console.log("Todo Delete error", error);
      toast.error("Delete invalid!!");
    }
  };

  const handleClickSave = async (id) => {
    try {
      // validate
      schemaTodo.validateSync(input, { abortEarly: false });
      console.log("userId handleClicksave",userId)
      console.log("input handleClicksave",input)

      //api
      await todoApi.updateTodo(userId,id,input);
      await actionFetchTodo(userId,id);
      setIsEdit(null);

      //alert
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
    }
  };

  return (
    <div className="p-8">
      <div className="mx-auto w-2/4 border border-pink-600 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <h1 className="mb-2">My Todo</h1>
          <Rocket className="w-5 h-5 text-pink-500" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 pl-2 flex justify-between gap-1">
          <InputForm
            name="taskName"
            placeholder="new task"
            handleChange={handleChange}
            error={inputError.taskName}
            value={input.taskName}
            type="text"
          />

          <button
            disabled={isLoading}
            className="bg-pink-200 rounded-2xl hover:bg-pink-400 py-2 px-3 mb-4 duration-300 cursor-pointer">
            {isLoading ? (
              <>
                <LoaderCircle
                  className="w-5 h-5 animate-spin"
                  strokeWidth={2.5}
                />
                <span>LOADING ...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>
        <hr className="border border-pink-800 mb-4" />
        {todoLists.map((item) => (
          <div
            className="flex items-center gap-2 bg-pink-100 rounded-2xl w-full p-2 mb-2"
            key={item?.id}>
            {isEdit === item.id ? (
              <>
                <InputForm
                  name="taskName"
                  placeholder="new task"
                  handleChange={handleChange}
                  error={inputError.taskName}
                  value={input.taskName}
                  type="text"
                />
              </>
            ) : (
              <>
                <input type="checkbox" />

                <p className="w-full">{item?.taskName}</p>
              </>
            )}

            {isEdit === item.id ? (
              <>
                <button onClick={() => handleClickSave(item.id)}>
                  <SaveIcon className="h-4 w-4 cursor-pointer text-pink-700" />{" "}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEdit(item.id);
                    setInput({
                      id: item.id,
                      taskName: item.taskName,
                    });
                  }}>
                  <Settings className="h-4 w-4 cursor-pointer text-pink-700" />{" "}
                </button>
              </>
            )}

            <button onClick={() => handleDelete(item.id)}>
              <X className="h-4 w-4 cursor-pointer text-pink-700" />{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoPage;
