const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

const uuid=()=>{
    return Math.floor(Math.random()*100000)
}

class TypeController {
    
    async create(req, res) {
        try {
            const {name} = req.body
            const type = await Type.create({id:uuid(), name})
            return res.json(type)
        } catch (error) {
            console.log(error)
        }
    }

    async update(req, res) {
        try {
            const {id,name} = req.body
            console.log("Seeee meee? Pleaseeee",id,name)
            const type = await Type.update({name:name},{where:{id:id}})
            return res.json(type)
        } catch (error) {
            console.log(error)
        }   
    }


    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

module.exports = new TypeController()