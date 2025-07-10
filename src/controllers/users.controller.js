const getAllUsers = (req, res) => {
  res.send({ status: "success", payload: [] });
};

const getUser = (req, res) => {
  res.send({ status: "success", payload: {} });
};

const createUser = (req, res) => {
  res.status(201).send({ status: "success", payload: req.body });
};

const updateUser = (req, res) => {
  res.send({ status: "success", message: "User updated" });
};

const deleteUser = (req, res) => {
  res.status(204).send();
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
