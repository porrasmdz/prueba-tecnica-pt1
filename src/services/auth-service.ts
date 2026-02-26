
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppDataSource from "../database/datasource";
import { User } from "../entities/user-model";

export class AuthService {
    private userRepo = AppDataSource.getRepository(User);
    private jwtSecret = process.env.JWT_SECRET || "supersecretkey";

    async register(username: string, password: string) {
        const existing = await this.userRepo.findOne({ where: { username } });
        if (existing) {
            throw new Error("Usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepo.create({
            username,
            password: hashedPassword
        });

        await this.userRepo.save(user);
        return { id_user: user.id_user, username: user.username };
    }

    async login(username: string, password: string) {
        const user = await this.userRepo.findOne({ where: { username } });
        if (!user) throw new Error("Usuario o contraseña inválidos");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Usuario o contraseña inválidos");

        const accessToken = jwt.sign(
            { userId: user.id_user, username: user.username },
            this.jwtSecret,
            { expiresIn: "1h" }
        );

        return {
            accessToken,
            user: { id_user: user.id_user, username: user.username }
        };
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (err) {
            throw new Error("Token inválido");
        }
    }
}