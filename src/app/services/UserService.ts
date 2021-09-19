import moment, { Moment } from "moment";
import { IUser } from "../models/UserModel";
import UserRepository from "../repository/UserRepository";

export default class UserService {

    static async putUser(user: IUser) {
        try {
            const User = await UserRepository.getUserbyUsername(user.username)
            if (!User) {
                await UserRepository.newUser(user)
            } else {
                await UserRepository.updateUser(user)
            }
            return true
        } catch (e) {
            throw e
        }
    }
    static async getUser(username: string) {
        try {
            const User = await UserRepository.getUserbyUsername(username)
            return User
        } catch (e) {
            throw e
        }
    }

    static getDaystoBirth(birthday: Moment): Number {
        try {
            console.log(birthday)
            const now = moment()
            birthday = moment(birthday)
            const year = this.getYear(birthday, now)
            const date = `${year}-${birthday.format('MM')}-${birthday.format('DD')}`
            return Math.ceil(moment.duration(moment(date,"YYYY-MM-DD").diff(now)).asDays())
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    static getYear(birthday: Moment, now: Moment) {
        switch(true) {
            case (birthday.month() < now.month()):
                return now.year() + 1
            case (birthday.month() == now.month() && (birthday.date() < now.date())):
                return now.year() + 1
            default:
                return now.year()
        }
    }

}