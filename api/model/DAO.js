const dbconfig = require('../../configs/database')

const DAO = class DAO{
    constructor(collection){
        this.client = dbconfig.client
        this.db = dbconfig.db
        this.collection = dbconfig.db.collection(collection)
        this.ObjectId = dbconfig.ObjectId
    }

    async executarMetodo(metodo){
        await this.client.connect()
        await metodo()
    }

    async mostrarTodos(){
        let res
        await this.executarMetodo(async ()=>{
            res = await this.collection.find().toArray()
        })
        return res
    }

    async mostrar(requisitos){
        if(requisitos.hasOwnProperty('_id')){
            requisitos._id = new this.ObjectId(requisitos._id)
        }
        let res
        await this.executarMetodo(async ()=>{
            res = await this.collection.findOne(requisitos)
        })
        return res
    }

    async inserir(documento){
        await this.executarMetodo(async ()=>{
            await this.collection.insertOne(documento)
        })
    }

    async deletar(requisitos){
        if(requisitos.hasOwnProperty('_id')){
            requisitos._id = new this.ObjectId(requisitos._id)
        }
        await this.executarMetodo(async ()=>{
            await this.collection.deleteMany(requisitos)
        })
    }

    async editar(documento, dados){
        await this.executarMetodo(async ()=>{
            await this.collection.updateOne(documento, {$set: dados})
        })
    }
}

module.exports = ()=>{
    return DAO
}