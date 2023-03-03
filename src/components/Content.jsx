import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { auth, db } from "../firebase";

const Content = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUserId, setTempUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              return setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  //add
  const createTask = () => {
    const userId = uid();

    set(ref(db, `${auth.currentUser.uid}/${userId}`), {
      todo: todo,
      userId: userId,
    });
    setTodo("");
  };

  //delete
  const deleteTask = (userId) => {
    remove(ref(db, `/${auth.currentUser.uid}/${userId}`));
  };

  //update

  const updateTask = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUserId(todo.userId);
  };

  const confirmUpdate = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUserId}`), {
      todo: todo,
      tempUserId: tempUserId,
    });

    setTodo("");
    setIsEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask();
  };

  return (
    <div className="pt-2 flex bg-gray-100">
      <div className="m-auto p-10 min-h-screen">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl ">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-sky-400">
            TAREFAS
          </span>
        </h1>
        <p class="text-lg mb-3 text-gray-500 lg:text-xl dark:text-gray-400">
          Aqui você consegue focar em suas tarefas e organizar os seus afazeres.
        </p>

        <form onSubmit={handleSubmit} className="flex items-center mb-3">
          <input
            type="text"
            className="w-11/12  sm:w bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-red-500 focus:border-blue-500 block pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Qual é a sua proxima tarefa?"
            value={todo}
            required
          />

          {isEdit ? (
            <div>
              <button
                className="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={confirmUpdate}
              >
                Confirmar
              </button>
            </div>
          ) : (
            <input
              className="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
              value="Add"
            />
          )}
        </form>

        {todos.map((todo) => (
          <div className="flex justify-between mt-3 mb-3 rounded-sm w-11/12   bg-white shadow p-3 gap-2 items-center hover:shadow-lg ease-in-out  transform">
            <h1 className="col-span-12 p-3 md:col-span-1 text-lg">
              {todo.todo}
            </h1>

            <div className="flex justify-end">
              <button
                className="p-2.5 ml-2 text-sm font-medium text-white bg-teal-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => updateTask(todo)}
              >
                Editar
              </button>
              <button
                className="p-2.5 ml-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800  focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => deleteTask(todo.userId)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
