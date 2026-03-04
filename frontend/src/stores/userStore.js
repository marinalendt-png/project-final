import { create } from "zustand";

// This is the global state of the app, Zustand. It contains accessToken, username, login and logout. AccessToken will be saved both here and in localstorage. 
export const useUserStore = create((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  username: localStorage.getItem("username"),

  login: (token, username) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username);
    set({ accessToken: token, username });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    set({ accessToken: null, username: null });
  },
}));
