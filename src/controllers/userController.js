import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserDAO from '../daos/userDAO.js';
import UserDTO from '../dtos/userDTO.js';

// Consultar un usuario por id
export async function getUserById(id) {
  try {
    const user = await UserDAO.getUserById(id);
    return new UserDTO(user);
  } catch (error) {
    return { message: 'Usuario no encontrado' };
  }
}

export async function createUser(inputData) {
  try {
    const user = {
      ...inputData,
      password: bcrypt.hashSync(inputData.password, 10),
    };

    const result = await UserDAO.createUser(user);
    return new UserDTO(result);
  } catch (error) {
    return { message: 'Error al crear el usuario' };
  }
}

// Eliminar un usuario
export async function deleteUser(id) {
  try {
    const deletedUser = await UserDAO.deleteUser(id);
    return new UserDTO(deletedUser);
  } catch (error) {
    return { message: 'Error al eliminar el usuario' };
  }
}

// Consultar todos los usuarios
export async function getUsers(inputData) {
  try {
    const result = await UserDAO.getUsers(inputData);
    return result.map((user) => new UserDTO(user));
  } catch (error) {
    return { message: 'Error al consultar los usuarios' };
  }
}

// Iniciar sesión
export async function login(inputData) {
  try {
    const user = await UserDAO.getUserByEmail(inputData?.email);
    if (!user || !bcrypt.compareSync(inputData?.password, user?.password)) {
      return {
        message: 'Datos de acceso invalidos. Revisar los datos ingresados',
      };
    }

    const token = jwt.sign(new UserDTO(user).get(), process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { access_token: token };
  } catch (error) {
    console.log(error);
    return { message: 'Error al iniciar sesión' };
  }
}

// Actualizar un usuario
export async function updateUser(id, inputData) {
  try {
    const updatedUser = await UserDAO.updateUser(id, inputData);
    return new UserDTO(updatedUser);
  } catch (error) {
    return { message: 'Error al actualizar el usuario' };
  }
}
