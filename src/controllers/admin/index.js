//  página inicial

module.exports.index = (app, req, res)=>{
    req.session.authorized = false
    res.render('index', {tentativaLogin: false})
}

module.exports.home = async (app, req, res)=>{
    if(req.session.authorized){
        const ProjetosDAO = new app.src.model.ProjetosDAO()
        const TecnologiasDAO = new app.src.model.TecnologiasDAO()
    
        let projetos = await ProjetosDAO.mostrarTodos()
        let tecnologias = await TecnologiasDAO.mostrarTodos()
        res.render('home', {projetos: projetos, tecnologias: tecnologias})
    }else{
        res.redirect('/')
    }
}

module.exports.login = async (app, req, res)=>{
    const crypto = require('crypto')
    const dbconnect = require('../../../configs/database.js')
    await dbconnect.client.connect()
    const adminkeys = dbconnect.db.collection('adminkeys')

    const encriptedAdminkey = crypto.createHash('md5').update(req.body.adminkey).digest('hex')

    const response = await adminkeys.findOne({key: encriptedAdminkey})
    await dbconnect.client.close()

    if(response != null){
        req.session.authorized = true
        res.redirect('/home')
        return
    }

    res.render('index', {tentativaLogin: true})
}

// script para gerar uma chave de login
/* module.exports.login = async (app, req, res)=>{
    const crypto = require('crypto')
    const dbconnect = require('../../../configs/database.js')
    await dbconnect.client.connect()
    const adminkeys = dbconnect.db.collection('adminkeys')

    const encriptedAdminkey = crypto.createHash('md5').update(req.body.adminkey).digest('hex')

    await adminkeys.insertOne({key: encriptedAdminkey})
    await dbconnect.client.close()


    res.redirect('/')
} */

//  página para editar modelos

module.exports.pageditar = async ( app, req, res, col)=>{
    if(req.session.authorized){
        if(col == 'projeto'){
            const ProjetosDAO = new app.src.model.ProjetosDAO()
            const TecnologiasDAO = new app.src.model.TecnologiasDAO()
            
            let projeto = await ProjetosDAO.mostrar({_id: req.params.id})
            let tecnologias = await TecnologiasDAO.mostrarTodos()
        
            res.render('editar', {col: col, projeto: projeto, tecnologias: tecnologias})
            return
        }
        const TecnologiasDAO = new app.src.model.TecnologiasDAO()
        
        let tecnologia = await TecnologiasDAO.mostrar({_id: req.params.id})

        res.render('editar', {col: col, tecnologia: tecnologia})
        return
    }else{
        res.redirect('/')
    }
}
