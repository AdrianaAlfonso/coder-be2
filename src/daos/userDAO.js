import UserModel from './models/userModel.js';

class UserDAO {
  async getUserById(id) {
    return await UserModel.findById(id).exec();
  }

  async createUser(user) {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  }

  async deleteUser(id) {
    return await UserModel.findByIdAndDelete(id);
  }

  async getUsers(query) {
    return await UserModel.find(query);
  }

  async updateUser(id, user) {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }
}

export default new UserDAO();
