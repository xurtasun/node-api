import mongoose, {Schema, Document, model, Types, Model} from 'mongoose';
import moment, { Moment } from "moment";

export interface IUser extends Document {
    username    : string
    dateOfBirth : Moment
    enabled     : string
    created     : Moment
    updated     : Moment
}

const User = new Schema({
    username    : { 
        type: String, 
        trim: true, 
        unique: true, 
        require: true,
        validate: function(username: string) {
            return !/\d/.test(username)
        }
    },
    dateOfBirth : { 
        type: Date, 
        require: true,
        validate: function(dateOfBirth: Date) {
            return moment(dateOfBirth).isBefore(moment()) && moment(dateOfBirth, 'YYYY-MM-DD').isValid()
        }
    },
    enabled     : { type: Boolean, default : true },
    created     : { type: Date, default: function () {
            return moment.utc()
        }},
    updated     : { type: Date, default: function () {
            return moment.utc()
        }}
})

User.index({username:1}, {unique: true})

User.pre<IUser>('save', function(next) {
    this.updated = moment.utc()
    next();
});

const UserModel : Model<IUser> = model('User', User);
export default UserModel;