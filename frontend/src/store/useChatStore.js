import { create } from "zustand";

import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

import { useAuthStore } from "./useAuthStore"




export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageingLoading: false,



    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/message/users")
            set({ users: res.data, })
        } catch (error) {
            toast.error(error.response.data.message)
            toast.error("Error fetching users")
        } finally {
            set({ isUserLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessageingLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({ messages: res.data, })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessageingLoading: false })
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()

        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
        } catch (error) {

            toast.error(error?.response?.data?.message || "Something went wrong");

        }

    },
    subscribeToMessages: () => {
        const { selectedUser } = get()

        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
            if (!isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages, newMessage],
            })
        })
    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    },

    setSelectedUser: (user) => set({ selectedUser: user })
}))
