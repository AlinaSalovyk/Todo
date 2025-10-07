import axios from "axios";

const API_BASE = "https://dummyjson.com/todos";

// GET with pagination: limit & skip
export async function fetchTodosApi(limit = 10, skip = 0) {
    const res = await axios.get(`${API_BASE}?limit=${limit}&skip=${skip}`);
    // { todos: [...], total, skip, limit }
    return res.data;
}

// DELETE by id (ігноруємо локальні)
export async function deleteTodoApi(id) {
    if (String(id).startsWith("local_")) return;
    await axios.delete(`${API_BASE}/${id}`);
}

// PUT toggle completed (ігноруємо локальні)
export async function toggleTodoApi(id, completed) {
    if (String(id).startsWith("local_")) return;
    await axios.put(`${API_BASE}/${id}`, { completed });
}

// PUT edit title (ігноруємо локальні)
export async function editTodoTitleApi(id, newTitle) {
    if (String(id).startsWith("local_")) return { todo: newTitle };
    const res = await axios.put(`${API_BASE}/${id}`, { todo: newTitle });
    return res.data; // { ...todo }
}
