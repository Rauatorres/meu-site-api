module.exports.inserirTecnologia = async (app, req, res)=>{
    if(req.session.authorized){
        const fs = require('fs')
        const path = require('node:path')
        const TecnologiasDAO = new app.src.model.TecnologiasDAO()
        let timestamp = Date.now()
        
        let imgFileName = timestamp + '_' + req.files.img.name
        let newPath = path.normalize(__dirname + '/../../../api_img/tecnologias')

        await fs.promises.rename(req.files.img.path, `${newPath}/${imgFileName}`)

        req.body.img = imgFileName

        await TecnologiasDAO.inserir(req.body)
        res.redirect('/home')
        return
    }else{
        res.redirect('/')
    }
}

module.exports.deletarTecnologia = async (app, req, res)=>{
    if(req.session.authorized){
        const fs = require('fs')
        const path = require('node:path')
        const TecnologiasDAO = new app.src.model.TecnologiasDAO()

        let tecnologia = await TecnologiasDAO.mostrar({_id: req.params.id})
        let imgPath = path.normalize(__dirname + '/../../../api_img/tecnologias')

        await fs.promises.unlink(`${imgPath}/${tecnologia.img}`)
        await TecnologiasDAO.deletar({_id: req.params.id})
        res.redirect('/home')
        return
    }else{
        res.redirect('/')
    }
}

module.exports.editarTecnologia = async (app, req, res)=>{
    if(req.session.authorized){
        const fs = require('fs')
        const path = require('node:path')
        const TecnologiasDAO = new app.src.model.TecnologiasDAO()
        let documento = await TecnologiasDAO.mostrar({_id: req.params.id})
        let timestamp = Date.now()
        let { body } = req
        
        let imgFileName = timestamp + '_' + req.files.img.name
        let newPath = path.normalize(__dirname + '/../../../api_img/tecnologias')

        await fs.promises.rename(req.files.img.path, `${newPath}/${imgFileName}`)
        await fs.promises.unlink(`${newPath}/${body.img_old}`)

        body.img = imgFileName
        delete body.img_old

        await TecnologiasDAO.editar(documento, body)
        res.redirect('/home')
        return
    }else{
        res.redirect('/')
    }
}