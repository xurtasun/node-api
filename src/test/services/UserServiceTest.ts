import moment from "moment"
import chai from 'chai'
import UserService from "../../app/services/UserService"
let should = chai.should()

describe("User Service Test", ()=> {
    it("Should return days to birth", ()=> {
        const days = UserService.getDaystoBirth(moment('1992-02-26'))
        days.should.eql(Math.ceil(moment.duration(moment('2022-02-26').diff(moment())).asDays()))
    })
    it("Should return next year if date passed or this year if not", () => {
        const year = UserService.getYear(moment('1992-02-26'),moment())
        year.should.eql(2022)
    })
})