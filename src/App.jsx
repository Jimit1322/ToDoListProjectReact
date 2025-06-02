import { useState ,useEffect } from 'react';
import "tailwindcss";
import './App.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [finished, setfinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS();
  };

  const handleedit = (e, id) => {
    const todo = todos.filter(i => i.id === id);
    settodo(todo[0].todo);
    const updatedTodos = todos.filter(todo => todo.id !== id);
    settodos(updatedTodos);
    saveToLS();
  };

  const handledelete = (e, id) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      settodos(updatedTodos);
      saveToLS();
    }
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  const handlecheck = (e) => {
    let id = e.target.name;
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    settodos(updatedTodos);
    saveToLS();
  };

  const togglefinish = () => {
    setfinished(!finished);
  };

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto my-5 bg-gradient-to-tr from-[#FFF8E1] to-[#FDEBD0] p-5 rounded-2xl min-h-[80vh] w-[95%] md:w-2/3 lg:w-1/2 shadow-xl"
      >
        <h1 className='font-bold text-center text-2xl text-[#5D4037] mb-4'>MyTask - Manage Your Todos</h1>

        <div className="add flex flex-col gap-3">
          <h2 className='font-semibold text-lg text-[#6D4C41]'>Add a Todo</h2>
          <input
            onChange={handlechange}
            value={todo}
            type='text'
            className='bg-white w-full rounded-full p-2 text-base border border-[#D7CCC8] focus:outline-none focus:ring-2 focus:ring-[#BCAAA4]'
          />
          <button
            onClick={handleadd}
            disabled={todo.length <= 3}
            className="bg-[#FFE0B2] hover:bg-[#FFCC80] text-[#5D4037] font-bold p-2 py-1 rounded-lg disabled:opacity-50"
          >
            ADD
          </button>
        </div>

        <div className='mt-5'>
          <label className='flex items-center gap-2 text-[#6D4C41]'>
            <input onChange={togglefinish} type="checkbox" checked={finished} />
            Show Finished
          </label>
        </div>

        <h2 className='font-bold text-lg mt-4 text-[#5D4037]'>Your Todos</h2>

        <div className="todos mt-3">
          {todos.length === 0 && <div className='m-5 text-[#8D6E63]'>No Todos to Display</div>}
          <AnimatePresence>
            {todos.map(item => {
              return (finished || !item.isCompleted) && (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="todo flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow-md p-3 my-2 border border-[#E0E0E0]"
                >
                  <div className='flex items-center gap-3 w-full sm:w-auto'>
                    <input
                      onChange={handlecheck}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <div className={item.isCompleted ? "line-through text-gray-400" : "text-[#5D4037] font-medium"}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={(e) => { handleedit(e, item.id); }}
                      className="bg-[#FFE0B2] hover:bg-[#FFCC80] text-[#6D4C41] p-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => { handledelete(e, item.id); }}
                      className="bg-red-200 hover:bg-red-300 text-red-800 p-2 rounded-lg"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export default App;