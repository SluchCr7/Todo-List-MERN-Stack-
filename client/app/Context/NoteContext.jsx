
'use client'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "./AlertContext";
import { useUser } from "./UserContext";

const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const { showAlert } = useAlert()
    const { user, setUser } = useUser()
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/note`);
                setNotes(data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        fetchNotes();
    }, [notes]);

    const addNote = async (taskData) => {
        try {
            // Support both old API (title, description) and new API (full object)
            const payload = typeof taskData === 'string'
                ? { title: taskData, description: arguments[1] || '' }
                : {
                    title: taskData.title,
                    description: taskData.description || '',
                    category: taskData.category || 'personal',
                    priority: taskData.priority || 'medium',
                    reminder: taskData.reminder || null,
                    notes: taskData.notes || ''
                };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACK_URL}/api/note/add/${user._id}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    },
                }
            );

            const newNote = response.data;

            // Update notes
            setNotes((prevNotes) => [...prevNotes, newNote]);

            // Update user.tasks
            const updatedUser = {
                ...user,
                tasks: [...(user.tasks || []), newNote],
            };
            setUser(updatedUser);

            showAlert("Task added successfully");
        } catch (error) {
            console.error("Error adding note:", error);
            showAlert("Failed to add task");
            throw error;
        }
    };


    const deleteNote = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/note/${id}`);
            setNotes(notes.filter((note) => note._id !== id));

            // Update user.tasks
            const updatedUser = {
                ...user,
                tasks: (user.tasks || []).filter((task) => task._id !== id),
            };
            setUser(updatedUser);

            showAlert("Task deleted successfully")
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const updateNote = async (id, updates) => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACK_URL}/api/note/${id}`,
                updates,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    },
                }
            );

            const updatedNote = response.data;

            // Update notes
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === id ? updatedNote : note
                )
            );

            // Update user.tasks
            const updatedUser = {
                ...user,
                tasks: (user.tasks || []).map((task) =>
                    task._id === id ? updatedNote : task
                ),
            };
            setUser(updatedUser);

            showAlert("Task updated successfully");
        } catch (error) {
            console.error("Error updating note:", error);
            showAlert("Failed to update task");
        }
    };

    const updatePriority = async (id, priority) => {
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_BACK_URL}/api/note/priority/${id}`,
                { priority },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            showAlert(`Priority updated to ${priority}`)
        } catch (error) {
            console.error("Error updating priority:", error);
        }
    };

    const makeTaskComplete = async (id) => {
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_BACK_URL}/api/note/complete/${id}`
            );
            showAlert("Task status updated")
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, updatePriority, makeTaskComplete }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNote = () => useContext(NoteContext);
