export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded, Please wait...",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occured while fetching response from the server. Please try again",
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while parsing request data",
  },
  networkError: {
    title: "Error",
    message: "Unable to coonect with the network",
  },
};


export const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  getAllTodos: { url: "/getAllTodos", method: "GET", params: true },
  getTodoById: { url: "/getTodo", method: "GET", query: true },
  updateTodo: { url: "/update", method: "PUT", query: true },
  deleteTodo: { url: "/delete", method: "DELETE", query: true },
  createTodo: { url: "/create", method: "POST" },
  authenticate : {url : '/authenticate',method : "GET",query: true},
};
