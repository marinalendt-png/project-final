import { create } from "zustand";

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

// Här skapas en zustand store som en global useState. 
// Vid login - accessToken läses från localstorage när appen startar och du förblir inloggad. token sparas i localstorage och här i store. 
// Vid logout - tas token bort från båda. 
// set är Zustands sätt att uppdatera State (som setState)