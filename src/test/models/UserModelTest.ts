import chai from 'chai'
import moment from 'moment'
import UserModel, { IUser } from '../../app/models/UserModel'

describe('User Model', ()=> {
    let user: IUser
    const create = {
        username    : 'xurtasun1',
        dateOfBirth : '1992-02-26'
    }
    function createLike(): IUser {
        return new UserModel(create)
    }

    beforeEach(()=>{
        user = createLike()
    })

    describe("Types Model", () => {
        const exercise = () : IUser => {
            return user
        }
        it("Should equal each type", ()=> {
            exercise().dateOfBirth.should.eql(new Date(create.dateOfBirth))
            exercise().enabled.should.eql(true)
            exercise().username.should.eql(create.username)
        })
    })
})