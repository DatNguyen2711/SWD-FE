import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuth: false,
      user: {
        active: false,
        id: null,
        email: null,
        picture: null,
        name: null,
        emailVerified: false,
        roleId: null,
      },
      role: null,

      setLogin: (data) =>
        set(() => {
          return {
            token: data.token,
            isAuth: true,
            user: {
              active: true,
              id: data.user.id,
              email: data.user.email,
              picture: data.user.picture,
              name: data.user.name,
              emailVerified: data.user.emailVerified,
              roleId: data.user.roleId,
            },
            role: data.role,
          };
        }),

      setLogout: () =>
        set(() => ({
          token: null,
          isAuth: false,
          user: {
            active: false,
            id: null,
            email: null,
            picture: null,
            name: null,
            emailVerified: false,
            roleId: null,
          },
          role: null,
        })),
    }),
    {
      name: "authstore",
    }
  )
);

export default useAuthStore;
