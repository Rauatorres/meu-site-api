const DAO = require('./DAO')()

const TecnologiasDAO = class TecnologiasDAO extends DAO{
    constructor(){
        super('tecnologias')
    }
}

module.exports = ()=>{
    return TecnologiasDAO
}