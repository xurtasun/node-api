import User, { IUser } from "../models/UserModel";

export default class UserRepository {
    static async newUser(user: IUser) {
        try {
            const newUser = new User(user)
            await newUser.save()
            return newUser
        } catch (e) {
            throw e
        }
    }
    static async getUserbyUsername(username : string) : Promise<IUser | null> {
        try {
            return await User.findOne({ username : username })
        } catch (e) {
            throw e
        }
    }
    static async updateUser(userUpdate: IUser) {
        try {
            const user = await this.getUserbyUsername(userUpdate.username)
            if (!user) throw new Error('User does not exist')
            user.set(userUpdate)
            await user.save()
            return user
        } catch (e) {
            throw e
        }
    }

    
}