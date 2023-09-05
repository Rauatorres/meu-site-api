const DAO = require('./DAO')()

const ProjetosDAO = class ProjetosDAO extends DAO{
    constructor(){
        super('projetos')
    }
}

module.exports = ()=>{
    return ProjetosDAO
}