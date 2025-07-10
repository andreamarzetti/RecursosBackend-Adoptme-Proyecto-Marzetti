import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

const register = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!first_name || !last_name || !email || !password)
        return res.status(400).send({ status: "error", error: "Incomplete values" });
  
      const exists = await usersService.getUserByEmail(email);
      if (exists)
        return res.status(400).send({ status: "error", error: "User already exists" });
  
      const hashedPassword = await createHash(password);
  
      const user = { first_name, last_name, email, password: hashedPassword };
  
      const result = await usersService.create(user);
  
      res.status(201).send({ _id: result._id }); // <-- aquí el cambio
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "error", error: "Internal server error" });
    }
  };
  
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({ status: "error", error: "Incomplete values" });

        const user = await usersService.getUserByEmail(email);
        if (!user)
            return res.status(404).send({ status: "error", error: "User doesn't exist" });

        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword)
            return res.status(400).send({ status: "error", error: "Incorrect password" });

        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, "tokenSecretJWT", { expiresIn: "1h" });

        // Enviar token en la cookie y en el body para que el test pase
        res.cookie("coderCookie", token, { maxAge: 3600000 });
        res.status(200).send({ status: "success", token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en login" });
    }
};

const current = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie'];
        if (!cookie) return res.status(401).send({ status: "error", error: "No token provided" });

        const user = jwt.verify(cookie, "tokenSecretJWT");
        res.send({ status: "success", payload: user });
    } catch (error) {
        console.error(error);
        res.status(401).send({ status: "error", error: "Invalid token" });
    }
};

const unprotectedLogin = async (req, res) => {
    // Similar al login, pero sin UserDTO
    // ...
};

const unprotectedCurrent = async (req, res) => {
    // Similar a current
    // ...
};

export default {
    register,
    login,
    current,
    unprotectedLogin,
    unprotectedCurrent
};
