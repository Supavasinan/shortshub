import bcrypt from "bcryptjs";

export const generateSalt = async () => {
    const salt = await bcrypt.genSalt(10);
    return salt
}