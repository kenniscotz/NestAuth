import * as bcrypt from 'bcrypt';

//  number of salt rounds to use for hashing passwords
const SALT_ROUNDS = 10;

// Hashes a password using bcrypt and returns the hashed password
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
}

// Compares a plain password with a hashed password and returns true if they match, false otherwise
export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}