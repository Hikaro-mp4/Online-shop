const ApiError=require('../error/ApiError')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {User,Basket}=require('../models/models')

const generateJwt=(id,email,role)=>{
    return jwt.sign(
        {id,email,role},
        process.env.SECRET_KEY,
        {expiresIn:'24h'})
}

const uuid=()=>{
    return Math.floor(Math.random()*100000)
}
class UserController{
    async registration(req,res,next){
        try{
            const {email,password,role}=req.body
            if(!email ||!password){
                return next(ApiError.badRequest('Noncorrect email or pass'))
            }
            const candidate=await User.findOne({where:{email}})
            if(candidate){
                return next(ApiError.badRequest('User already exist'))
            }
            const hashPassword=await bcrypt.hash(password,5)
            const user=await User.create({id:uuid(),email,role,password:hashPassword})
            const basket=await Basket.create({id:uuid(),userId:user.id})
            console.log(user.id)
            const token=generateJwt(user.id,user.email,user.role)
            return res.json({token})
        }catch(e){
            console.log(e)
        }
    }
      
    async login(req,res,next){
       try{
            const {email,password}=req.body
            const user=await User.findOne({where:{email}})
            console.log(user)
            
            if(!user){
                return next(ApiError.badRequest('Wrong email'))
            }
            let comparePassword=bcrypt.compareSync(password,user.password)
            if(!comparePassword){
                return next(ApiError.badRequest('Wrong password'))
            }
            const token=generateJwt(user.id,user.email,user.role)
            return res.json({token})
       }catch(e){
        console.log(e)
       }
    }

    async check(req,res,next){
       const token=generateJwt(req.user.id,req.user.email,req.user.role)
       return res.json({token})
    }
}

module.exports=new UserController()