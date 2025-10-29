export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")); // Must match login save
};

export const setCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
