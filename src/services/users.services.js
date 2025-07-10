import User from "../dao/models/User.js";

const getAll = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const create = async (userData) => {
  return await User.create(userData);
};

const update = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const getByEmail = async (email) => {
  return await User.findOne({ email });
};

export default {
  getAll,
  getUserById,
  create,
  update,
  delete: deleteUser,
  getByEmail,
};
