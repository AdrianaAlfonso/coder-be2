import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

// Consultar un usuario por id
export async function getUserById(id) {
  try {
    const user = await UserModel.findById(id).exec();
    return user;
  } catch (error) {
    return { message: 'Usuario no encontrado' };
  }
}

export async function createUser(inputData) {
  try {
    await UserModel.validate(inputData);

    const user = {
      ...inputData,
      password: bcrypt.hashSync(inputData.password, 10),
    };

    const result = new UserModel(user);
    await result.save();
    return result;
  } catch (error) {
    return { message: 'Error al crear el usuario' };
  }
}

// Eliminar un usuario
export async function deleteUser(id) {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    return { message: 'Error al eliminar el usuario' };
  }
}

// Consultar todos los usuarios
export async function getUsers(inputData) {
  try {
    const result = await UserModel.find(inputData);
    return result;
  } catch (error) {
    return { message: 'Error al consultar los usuarios' };
  }
}

// Iniciar sesión
export async function login(inputData) {
  try {
    const user = await UserModel.findOne({ email: inputData?.email });
    if (!user) {
      return {
        message: 'Datos de acceso invalidos. Revisar los datos ingresados',
      };
    }

    if (!user || !bcrypt.compareSync(inputData?.password, user?.password)) {
      return {
        message: 'Datos de acceso invalidos. Revisar los datos ingresados',
      };
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return { access_token: token };
  } catch (error) {
    return { message: 'Error al iniciar sesión' };
  }
}

// Actualizar un usuario
export async function updateUser(id, inputData) {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, item, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    return { message: 'Error al actualizar el usuario' };
  }
}
