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
import ShowTodoDelete from "../components/ShowTodoDelete";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

const initialInput = {
  taskName: "",
  userId: 14,
};

function ToDoPage() {
  const actionFetchTodo = useTodoStore((state) => state.actionFetchTodo);

  const isLoading = useTodoStore((state) => state.isLoading);
  const loading = useTodoStore((state) => state.loading);
  const done = useTodoStore((state) => state.done);

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  // const [isLoading, setIsLoading] = useState(false);

  const userId = useAuthStore((state) => state.userId);

  const navigate = useNavigate();

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
      e.preventDefault();
      // setIsLoading(true);
      loading;
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
      done;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center gap-4">
          <LoaderCircle className="w-5 h-5 animate-spin" strokeWidth={2.5} />
          <span className="text-pink-500 font-bold text-2xl">LOADING ...</span>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="mx-auto w-2/4 border border-pink-600 rounded-3xl p-8">
              <div className="flex items-center justify-between">
                <h1 className="mb-2">My Todo</h1>
                <Rocket className="w-5 h-5 text-pink-500" />
              </div>

              <form onSubmit={handleSubmit}>
                <InputForm
                  name="taskName"
                  placeholder="new task"
                  handleChange={handleChange}
                  error={inputError.taskName}
                  value={input.taskName}
                  type="text"
                />
              </form>
              <hr className="border border-pink-800 m-4" />
              <ShowTodoDelete />
              <button
                onClick={() => navigate("/")}
                className="bg-pink-50 rounded-2xl w-full text-sm p-2 flex justify-center items-center gap-2 font-bold hover:bg-pink-300 cursor-pointer">
                <LogOut className="w-5 h-5 text-pink-500" strokeWidth={2.5} />
                LOGOUT
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ToDoPage;
