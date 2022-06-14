const { sequelize } = require('./../index')
const {Basket, User, BasketDevice,Device}=require('../models/models')
const { Sequelize } = require('../db')
const ApiError=require('../error/ApiError')

const uuid=()=>{
    return Math.floor(Math.random()*100000)
}

class BasketController{
    async addToBasket(req,res,next){
        try {
            const {deviceId,userId} = req.body
            
            const basket=await Basket.findOne(
                {
                    where:{
                        userId:userId
                    }
                }
                )
            const basketId=basket.id
            const check=await BasketDevice.count(
                {
                    where:{
                        basketId:basketId,
                        deviceId:deviceId
                    }
                }
                )
            if(check>0){
                console.log( 'thats all? Emtpy array? Are you kidding me?!',check)
                return next(ApiError.badRequest('This device already in basket'))
            }
            console.log(basketId,deviceId,userId)
            const basketDevice = await BasketDevice.create({id:uuid(),deviceId,basketId })
            return res.json(basketDevice)
        } catch (error) {
          console.log(error)
        }
    }

    async getBasket(req,res){
        try {
            const {id}=req.query
            const basket = await Device.findAndCountAll(
                {
                    include:[
                        {
                            model:BasketDevice,
                            required: true,
                            include:[
                                {
                                    model:Basket,
                                    where:{
                                        userId:id
                                    },
                                }
                            ]
                        }
                    ]
                }
            )

            return res.json(basket)
        } catch (error) {
            console.log(error)
        }
    }

    async delFromBasket(req,res){
        try {
            const {userId,deviceId}=req.query
            console.log(req.query)
            const basket =BasketDevice.destroy(
                {
                    where:{
                        deviceId:deviceId
                    },
                    required: true,
                    include:[
                        {
                            model:Basket,
                            where:{
                                userId:userId
                            }
                        }
                    ]
                }
            )
            return res.json(basket)
        } catch (error) {
            console.log(error)
        }
    }



    async getAll(req,res){
        const baskets=await Basket.findAll()
        return res.json(baskets)
    }
}

module.exports=new BasketController()