import Client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

export type User = {
    id ?: number,
    username: string,
    firstname ?: string,
    lastname ?: string,
    password: string
}

export class UserStore {

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);   
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error occured while fetching user ${id}. Error: ${error}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *';
            
            const hashPassword = bcrypt.hashSync(
                u.password + pepper, parseInt(saltRounds)
            );
            const result = await conn.query(sql, [u.username, u.firstname, u.lastname, hashPassword]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add new user ${u.firstname}. Error: ${error}`)
        }
    }

    async update(u: User, id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'UPDATE users SET username=($1), firstname=($2), lastname=($3), password=($4) WHERE id=($5) RETURNING *';
            const hashPassword = bcrypt.hashSync(
                u.password + pepper, parseInt(saltRounds)
            );
            const result = await conn.query(sql, [u.username, u.firstname, u.lastname, hashPassword, id]);
            conn.release();
            
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update user ${u.firstname}. Error: ${error}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete user ${id}. Error: ${error}`)
        }
    }

    /**
     * Authentication
     */
    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect();
        const sql = 'SELECT password FROM users WHERE username=($1)';

        const result = await conn.query(sql, [username]);

        if (result.rows.length) {
            const user = result.rows[0];

            if(bcrypt.compareSync(password+pepper, user.password)) {
                return user;
            }
        }

        return null;
    }

}