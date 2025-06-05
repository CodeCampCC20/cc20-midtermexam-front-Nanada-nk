import { create } from "zustand";
import todoApi from "../api/todoApi";

const useTodoStore = create((set)=>({
  todoLists: [],
  actionFetchTodo: async () => {
    const res = await todoApi.getAllTodoByUserID(14)
    console.log("res todoStore",res)
    console.log("res todoStore",res.data.todos)

    set({todoLists:res.data.todos})
  }
}))

export default useTodoStore