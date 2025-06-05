/** @format */



import todoApi from "../api/todoApi";
import useTodoStore from "../stores/todoStore";
import ShowTodoEdit from "./ShowTodoEdit";

function ShowTodoDelete() {
  const todoLists = useTodoStore((state) => state.todoLists);
  const actionFetchTodo = useTodoStore((state) => state.actionFetchTodo);

  console.log("todoLists ShowTodoDelete", todoLists);

  const handleDelete = async (id) => {
    try {
      console.log("id handleDelete TodoPage", id);
      await todoApi.deleteTodo(id,14);
      await actionFetchTodo();

      toast.success("Delete success!!");
    } catch (error) {
      console.log("Todo Delete error", error);
      toast.error("Delete invalid!!");
    }
  };

  return (
    <>
      
        <div>
          {todoLists.map((item) => (
            <ShowTodoEdit key={item?.id} handleDelete={handleDelete} actionFetchTodo={actionFetchTodo} item={item} />
          ))}
        </div>
    </>
  );
}

export default ShowTodoDelete;


