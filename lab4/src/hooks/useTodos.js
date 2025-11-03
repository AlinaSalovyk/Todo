"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
    fetchTodosApi,
    deleteTodoApi,
    toggleTodoApi,
    editTodoTitleApi,
} from "../api/todos";

export default function useTodos(initialLimit = 10) {
    // базо ві стани
    const [allTodos, setAllTodos] = useState([]); // поточний набір (сторінка) з API
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // пагінація
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(initialLimit);
    const [totalTodos, setTotalTodos] = useState(0);

    // пошук
    const [searchTerm, setSearchTerm] = useState("");

    const skip = useMemo(
        () => (currentPage - 1) * limitPerPage,
        [currentPage, limitPerPage]
    );

    // FETCH (щ пагінації)
    const fetchTodos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchTodosApi(limitPerPage, skip);
            // нормалізуємо id до string
            const normalized = data.todos.map((t) => ({ ...t, id: String(t.id) }));
            setAllTodos(normalized);
            setTotalTodos(Number(data.total) || normalized.length);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [limitPerPage, skip]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // ADD: тільки локально (без бекенду)
    const addTodo = useCallback((task) => {
        const newTodo = {
            id: `local_${Date.now()}`,
            todo: task,
            completed: false,
            userId: 0,
        };
        // додаємо у поточний набір
        setAllTodos((prev) => [newTodo, ...prev]);
        // збільшуємо total для відображення
        setTotalTodos((t) => t + 1);
        return newTodo;
    }, []);

    // DELETE (optimistic)
    const deleteTodo = useCallback(async (id) => {
        setIsLoading(true);
        setError(null);

        const prev = allTodos;
        setAllTodos((cur) => cur.filter((t) => String(t.id) !== String(id)));
        setTotalTodos((t) => Math.max(0, t - 1));

        try {
            await deleteTodoApi(id);
        } catch (err) {
            // відкотимо у випадку помилки
            setAllTodos(prev);
            setTotalTodos((t) => t + 1);
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [allTodos]);

    // TOGGLE (optimistic)
    const toggleTodo = useCallback(async (id) => {
        setIsLoading(true);
        setError(null);

        const before = allTodos.find((t) => String(t.id) === String(id));
        if (!before) {
            setIsLoading(false);
            return;
        }

        // оптимістичне оновлення
        setAllTodos((cur) =>
            cur.map((t) =>
                String(t.id) === String(id) ? { ...t, completed: !t.completed } : t
            )
        );

        try {
            await toggleTodoApi(id, !before.completed);
        } catch (err) {
            // відкат
            setAllTodos((cur) =>
                cur.map((t) =>
                    String(t.id) === String(id) ? { ...t, completed: before.completed } : t
                )
            );
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [allTodos]);

    // EDIT TITLE (pessimistic: чекаємо успішний PUT, потім локально оновлюємо)
    const editTodoTitle = useCallback(async (id, newTitle) => {
        setIsLoading(true);
        setError(null);
        try {
            const updated = await editTodoTitleApi(id, newTitle);
            // updated може бути { todo: '...' } або весь об'єкт (залежить від API/локального)
            const title = updated?.todo ?? newTitle;
            setAllTodos((cur) =>
                cur.map((t) => (String(t.id) === String(id) ? { ...t, todo: title } : t))
            );
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // пошук по поточному набору (сторінці)
    const todos = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return allTodos;
        return allTodos.filter((t) => String(t.todo).toLowerCase().includes(term));
    }, [allTodos, searchTerm]);

    // Pagination helpers
    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(totalTodos / limitPerPage)),
        [totalTodos, limitPerPage]
    );

    const goToNextPage = useCallback(() => {
        setCurrentPage((p) => Math.min(p + 1, totalPages));
    }, [totalPages]);

    const goToPrevPage = useCallback(() => {
        setCurrentPage((p) => Math.max(1, p - 1));
    }, []);

    const setLimit = useCallback((limit) => {
        setLimitPerPage(Number(limit) || 10);
        setCurrentPage(1); // скидаємо на першу сторінку
    }, []);

    const refresh = useCallback(() => fetchTodos(), [fetchTodos]);

    return {
        // дані для відмальовки
        todos,
        isLoading,
        error,

        // CRUD
        addTodo,
        deleteTodo,
        toggleTodo,
        editTodoTitle,

        // пошук
        searchTerm,
        setSearchTerm,

        // пагінація
        currentPage,
        limitPerPage,
        totalTodos,
        totalPages,
        goToNextPage,
        goToPrevPage,
        setLimit,

        // сервісне
        refresh,
    };
}
