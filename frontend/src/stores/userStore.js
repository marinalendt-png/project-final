import { create } from "zustand";

export const useUserStore = create((set) => ({
  accessToken: localStorage.getItem("accessToken"),

  login: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },
}));

// Här skapas en zustand store som en global useState. 
// Vid login - accessToken läses från localstorage när appen startar och du förblir inloggad. token sparas i localstorage och här i store. 
// Vid logout - tas token bort från båda. 
// set är Zustands sätt att uppdatera State (som setState)