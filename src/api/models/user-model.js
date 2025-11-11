const userItems = [
  {
    user_id: 3609,
    name: "John Doe",
    username: "johndoe",
    email: "john@metropolia.fi",
    role: "user",
    password: "password",
  },
  {
    user_id: 3610,
    name: "Ali Abbas",
    username: "aliabbas",
    email: "ali@metropolia.fi",
    role: "admin",
    password: "secret",
  },
];

const listAllUsers = () => userItems;

const findUserById = (id) => userItems.find((item) => item.user_id == id);

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = userItems[userItems.length - 1].user_id + 1;
  userItems.push({ user_id: newId, name, username, email, role, password });
  return { user_id: newId };
};

export { listAllUsers, findUserById, addUser };
