
'use client'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "./AlertContext";
import { useUser } from "./UserContext";

const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const { showAlert } = useAlert()
    const {user , setUser} = useUser()
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

const addNote = async (title, description = '') => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACK_URL}/api/note/add/${user._id}`,
            { title, description },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}` // إضافة التوكن إن وُجد
                },
            }
        );

        const newNote = response.data; // تأكد أن السيرفر يرجع النوت الجديد

        // ✅ تحديث الملاحظات
        setNotes((prevNotes) => [...prevNotes, newNote]);

        // ✅ تحديث user.tasks
        const updatedUser = {
            ...user,
            tasks: [...(user.tasks || []), newNote],
        };
        setUser(updatedUser); // <-- هذا مهم لتحديث السياق مباشرة

        showAlert("Note added successfully");
    } catch (error) {
        console.error("Error adding note:", error);
    }
};


    const deleteNote = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/note/${id}`);
            setNotes(notes.filter((note) => note._id !== id));
            showAlert("Note deleted successfully")
        } catch (error) {
            console.error("Error deleting note:", error);
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
            // setNotes((prevNotes) =>
            //     prevNotes.map((note) =>
            //         note._id === id ? updatedNote : note
            //     )
            // );
            showAlert(`Priority updated successfully to ${priority}`)
        } catch (error) {
            console.error("Error updating priority:", error);
        }
    };

    const makeTaskComplete = async (id) => {
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_BACK_URL}/api/note/complete/${id}`
            );
            // setNotes((prevNotes) =>
            //     prevNotes.map((note) =>
            //         note._id === id ? updatedNote : note
            //     )
            // );
            showAlert("Task completed successfully")
        } catch (error) {
            console.error("Error updating priority:", error);
        }
    };
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updatePriority , makeTaskComplete }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNote = () => useContext(NoteContext);
