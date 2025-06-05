import { create } from "zustand";
import authApi from "../api/authApi";

const useAuthStore = create((set)=> ({
  userId: "",
  accessToken: "",

  actionFetchLogin: async (input) => {
    const res = await authApi.login(input)
    console.log("authStore res",res)
    // console.log("authStore res",res)
    set({
      userId:res.data.userId,
      accessToken:res.data.accessToken
    })
  }

}))

export default useAuthStore