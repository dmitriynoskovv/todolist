import React, {useEffect} from 'react';
import ToDoList from './toDoList/toDoList'
import Context from "./Context";
import Loader from './Loader';

const AddTodos = React.lazy(() => import('./toDoList/AddTodos'))

function App() {

    const [loading, setLoading] = React.useState(true)

    const [todos, setTodos] = React.useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos)
                    setLoading(false)
                }, 2000)

                })

    }, [])

    function toggleToDo(id) {
        setTodos(todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        )
    }

    let removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    let addTodo = (title) => {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
        }]))
    }


    return (
        <Context.Provider value={{ removeTodo }}>
            <div className='wrapper'>
                <h1>React ToDoList</h1>
                <React.Suspense fallback={<p>Loading....</p>}>
                    <AddTodos onCreate={ addTodo } />
                </React.Suspense>


                {loading && <Loader />}
                {todos.length ?
                    <ToDoList todos={todos} onToggle={toggleToDo}/> :
                    loading? null : (
                    <p>Запланированных дел нет.</p>)}


            </div>
        </Context.Provider>
    )
}

export default App;
