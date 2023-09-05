import { useState } from "react";

function Todolish() {
    const [todo, setTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState(null)
    const [jobs, setJobs] = useState("");

    let todos = JSON.parse(localStorage.getItem("data")) || [];

    //  hàm thêm
    const handleSubmit = (e) => {
        e.preventDefault()
        if (todo === "") {
            alert("bạn không được để trống");
            return;
        }
        const newData = {
            id: Math.floor(Math.random() * 1000),
            todo: todo,
            status: false,
        }
        alert("bạn đã thêm thành công")
        localStorage.setItem("data", JSON.stringify([...todos, newData]))
        setTodo("")
    }

    // hàm xóa
    const handleDelete = (todo) => {
        if (window.confirm("bạn có muốn xóa không?")) {
            const updatedTodos = todos.filter((item) => item.id !== todo.id);
            localStorage.setItem("data", JSON.stringify(updatedTodos));
            setJobs(updatedTodos);
        }
    };

    // hàm edit
    const handleEditTodos = (e) => {
        setEditingTodo(e.id);
        setTodo(e.todo);
    };

    // hàm save
    const handleSaveTodo = () => {
        if (editingTodo === null) {
            return;
        }
        const updatedTodos = todos.map((item) =>
            item.id === editingTodo ? { ...item, todo: todo } : item
        );
        localStorage.setItem("data", JSON.stringify(updatedTodos));
        setEditingTodo(null);
        setTodo("");
    };

    // hàm cheked
    const handleCheckInput = (id) => {
        const index = todos.findIndex(el => el.id == id)
        todos[index].status = !todos[index].status
        localStorage.setItem("data", JSON.stringify(todos))
        setJobs(todos)
    }

    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div
                        className="row d-flex justify-content-center align-items-center after: h-100">
                        <div className="col col-xl-10">
                            <div className="card">
                                <div className="card-body p-5">
                                    <h3 style={{ textAlign: "center", marginBottom: 40 }}>
                                        Todo List <br />
                                        <h5 style={{ fontSize: '15px' }}>Get things done, one item of a time</h5>
                                    </h3>
                                    <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist"> </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active">
                                            {todos.map((e) => (
                                                <ul key={e.id}>
                                                    <li>
                                                        {editingTodo === e.id ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={todo}
                                                                    onChange={(event) => setTodo(event.target.value)}
                                                                />
                                                                <button
                                                                    className="btn btn-info ms-2"
                                                                    onClick={handleSaveTodo}>
                                                                    Save
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="checkbox">
                                                                    <div >
                                                                        <input type="checkbox" checked={e.status} onChange={() => handleCheckInput(e.id)} /> &emsp;
                                                                        <span style={e.status ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{e.todo}{" "}</span>
                                                                    </div>
                                                                    <div className="allbutton">
                                                                        <button
                                                                            className="btn btn-success"
                                                                            onClick={() => handleDelete(e)}>
                                                                            <i className="fa-sharp fa-solid fa-trash"></i>
                                                                        </button>&emsp;

                                                                        <button
                                                                            className="btn btn-warning"
                                                                            onClick={() => handleEditTodos(e)}>
                                                                            {editingTodo === e.id ? "Save" : ""}
                                                                            <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </li>
                                                </ul>
                                            ))
                                            }
                                        </div>
                                    </div>
                                    <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist"></ul> <br />
                                    <form
                                        onSubmit={handleSubmit}
                                        className="d-flex justify-content-center align-items-center mb-4">
                                        <div className="form-outline flex-fill">
                                            <input
                                                type="text"
                                                id="form2"
                                                className="form-control"
                                                placeholder="Add to the todo lish..."
                                                value={todo}
                                                onChange={(e) => setTodo(e.target.value)}
                                            />
                                        </div>

                                        <button
                                            onClick={handleSaveTodo}
                                            type="submit"
                                            className="btn btn-info ms-2">
                                            Add Item
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Todolish;