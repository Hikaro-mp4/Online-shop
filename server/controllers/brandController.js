const {Brand}=require('../models/models')

const uuid=()=>{
    return Math.floor(Math.random()*100000)
}

class BrandController{
    async create(req,res){
        try {
            const {name} = req.body
            const brand = await Brand.create({id:uuid(), name})
            return res.json(brand)
        } catch (error) {
          console.log(error)
        }
    }

    async update(req, res) {
        try {
            const {id,name} = req.body
            const brand = await Brand.update({name:name},{where:{id:id}})
            return res.json(brand)
        } catch (error) {
            console.log(error)
        }   
    }

    async getAll(req,res){
        const brands=await Brand.findAll()
        return res.json(brands)
    }
}

module.exports=new BrandController()