import axios from "axios";

const API_BASE = "https://dummyjson.com/todos";

// Fetch todos (limit optional)
export const fetchTodosApi = async (limit = 20) => {
    const res = await axios.get(`${API_BASE}?limit=${limit}`);
    return res.data?.todos || [];
};


// Delete todo by id
export const deleteTodoApi = async (id) => {
    // If local task, skip API call
    if (String(id).startsWith("local_")) return;
    await axios.delete(`${API_BASE}/${id}`);
};

// Toggle todo completion
export const toggleTodoApi = async (id, completed) => {
    // If local task, skip API call
    if (String(id).startsWith("local_")) return;
    await axios.put(`${API_BASE}/${id}`, { completed });
};
