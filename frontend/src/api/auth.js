import API from "./axios";

export const register = (userData) => API.post("/auth/register/", userData);
export const login = (credentials) => API.post("/auth/token/", credentials);
export const logout = (credentials) => API.post("/auth/token/logout/", credentials);
export const getUserInfo = () => {
  return API.get("/auth/user_info/");
};
export const getUserInterests = () => {
    return API.get("chat/interests/")
}