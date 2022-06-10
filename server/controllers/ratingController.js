const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError');

const uuid=()=>{
    return Math.floor(Math.random()*100000)
}

class RatingController {
   
    async create(req, res,next) {
       try {
        const {userId,deviceId,rate} = req.body
        console.log(userId,deviceId,rate)
        const checkExitRate=await Rating.findOne(
            {where:
                {
                    userId,
                    deviceId
                }
            })
            console.log(checkExitRate)
        if(checkExitRate){
            return next(ApiError.badRequest("You already rating this device"))
        }
        console.log('work? Are you continue?')
        const rating = await Rating.create({id:uuid(), userId,deviceId,rate})
        return res.json(rating)
       } catch (error) {
            console.log(error)
       }
    }

    async getAll(req, res) {
        const ratings = await Rating.findAll()
        return res.json(ratings)
    }

    async getRating(req, res) {
        try {
            const {id}=req.query
            console.log(id)
            //const ratings = await Rating.findAll({where:{deviceId}})
            const summ=await Rating.sum('rate',{where:{deviceId:id}})
            const count=await Rating.count({where:{deviceId:id}})       
            return res.json((summ/count).toFixed(1))
        } catch (error) {
            console.log(error)
        }
    }
    

    async update(req, res,next) {
        try {
            const ratings = await Rating.update({rate},
                {
                    where:{
                        userId,
                        deviceId
                    }
                }
            )
            return res.json(ratings)
        } catch (error) {
            
        }
    }

}

module.exports = new RatingController()