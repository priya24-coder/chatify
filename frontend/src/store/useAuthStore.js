import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  // ✅ CHECK AUTH
  checkAuth: async () => {
  try {
    const res = await axiosInstance.get("/auth/check", {
      withCredentials: true,
    });

    set({ authUser: res.data });
    get().connectSocket();

  } catch (error) {
    // 401 = not logged in → normal case
    if (error.response?.status === 401) {
      set({ authUser: null });
    } else {
      console.error("Auth check failed:", error);
    }

  } finally {
    set({ isCheckingAuth: false });
  }
},

  // ✅ SIGNUP
  signup: async ({ fullName, email, password }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", {
        fullName,
        email,
        password,
      });

      set({ authUser: res.data });
      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ✅ LOGIN (FIXED – THIS WAS THE PROBLEM)
  login: async ({ email, password }) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ✅ LOGOUT
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  // ✅ UPDATE PROFILE
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error?.response?.data?.message || "Update failed");
    }
  },

  // ✅ SOCKET CONNECT
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      withCredentials: true,
    });

    newSocket.connect();

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  // ✅ SOCKET DISCONNECT
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
  },
}));
