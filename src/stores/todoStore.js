import { create } from "zustand";
import todoApi from "../api/todoApi";

const useTodoStore = create((set) => ({
  todoLists: [],
  isLoading: false,
  loading: () => set({ isLoading: true }),
  done: () => set({ isLoading: false }),
  actionFetchTodo: async () => {
    set({ isLoading: true })
    const res = await todoApi.getAllTodoByUserID(14)
    console.log("res todoStore", res)
    console.log("res todoStore", res.data.todos)
    set({ isLoading: false })

    set({ todoLists: res.data.todos })
  }
}))

export default useTodoStore