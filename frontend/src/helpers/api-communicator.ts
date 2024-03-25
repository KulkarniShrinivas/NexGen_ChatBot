import axios from "axios";

const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token,
    },
  };

  return config;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const config = getTokenHeader();
  const res = await axios.get("/user/auth-status", config);
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const config = getTokenHeader();
  const res = await axios.post("/chat/new", { message }, config);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const config = getTokenHeader();
  const res = await axios.get("/chat/all-chats", config);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const config = getTokenHeader();
  const res = await axios.delete("/chat/delete", config);
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

// export const logoutUser = async () => {
//   const config = getTokenHeader();
//   const res = await axios.get("/user/logout", config);
//   if (res.status !== 200) {
//     throw new Error("Unable to delete chats");
//   }
//   const data = await res.data;
//   return data;
// };

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};
