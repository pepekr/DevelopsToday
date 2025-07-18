import bcrypt from 'bcrypt'

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
        throw new Error("Password verification failed: " + (err as Error).message);
    }
}
/**
 * Hashes password with bcrypt
 * @param password Password that needs to be hashed
 * @returns Hashed passoword
 */
export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        throw new Error("Hashing failed: " + err);
    }
};
