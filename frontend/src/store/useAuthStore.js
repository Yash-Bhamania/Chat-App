"use client";

import { create } from "zustand";
import { axiosInstance } from "./../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuthStore = create((set) => ({
  authUser: null,

  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("error in check auth ", error);
      console.error(
        "Error in checkAuth:",
        error.response?.data || error.message
      );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });


    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });


      toast.success("Account Created Succesfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully");
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      return false;
    } finally {
      set({ isLogingIn: false });
    }
  },


  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
     
      toast.success("Sucessfully logout");
      return true
    } catch (error) {
      toast.error(error.response.data.message);
      return false
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  
}));
