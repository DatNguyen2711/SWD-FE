import create from "zustand";

const useEmailStore = create((set) => ({
  data: "",
  name: null,
  email: null,
  changepassword: false,
  register: false,
  setVerifyCode: (data) => set({ data }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setChangepassword: (value) => set({ changepassword: value }),
  setRegister: (value) => set({ register: value }),
}));

export default useEmailStore;
