const {MongoClient} = require('mongodb')
const ObjectId = require('mongodb').ObjectId

require('dotenv').config()

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

// const client = new MongoClient(`mongodb+srv://${username}:${password}@meu-site.twmm2ol.mongodb.net/?retryWrites=true&w=majority`)
const client = new MongoClient(`mongodb://${username}:${password}@ac-j143rcv-shard-00-00.twmm2ol.mongodb.net:27017,ac-j143rcv-shard-00-01.twmm2ol.mongodb.net:27017,ac-j143rcv-shard-00-02.twmm2ol.mongodb.net:27017/?ssl=true&replicaSet=atlas-1459jh-shard-0&authSource=admin&retryWrites=true&w=majority`)
const db = client.db('meu-site')

module.exports = {
    //configs banco de dados
    client: client,
    db: db,
    ObjectId: ObjectId
}
