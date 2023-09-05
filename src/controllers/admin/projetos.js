module.exports.inserirProjeto = async (app, req, res)=>{
    if(req.session.authorized){
        const fs = require('fs')
        const path = require('node:path')
        const ProjetosDAO = new app.src.model.ProjetosDAO()
        let timestamp = Date.now()
        
        let imgFileName = timestamp + '_' + req.files.img.name
        let newPath = path.normalize(__dirname + '/../../../api_img/projetos')

        await fs.promises.rename(req.files.img.path, `${newPath}/${imgFileName}`)

        req.body.img = imgFileName

        await ProjetosDAO.inserir(req.body)
        res.redirect('/home')
        return
    }else{
        res.redirect('/')
    }
}

module.exports.deletarProjeto = async (app, req, res)=>{
    
    if(req.session.authorized){
        const fs = require('fs')
        const path = require('node:path')
        const ProjetosDAO = new app.src.model.ProjetosDAO()

        let projeto = await ProjetosDAO.mostrar({_id: req.params.id})
        let imgPath = path.normalize(__dirname + '/../../../api_img/projetos')

        await fs.promises.unlink(`${imgPath}/${projeto.img}`)
    
        await ProjetosDAO.deletar({_id: req.params.id})
        res.redirect('/home')
        return
    }else{
        res.redirect('/')
    }
}

module.exports.editarProjeto = async (app, req, res)=>{
    console.log('teste editar')
    if(req.session.authorized){
        const fs = require('fs')
        const path = require('node:path')
        const ProjetosDAO = new app.src.model.ProjetosDAO()
        let documento = await ProjetosDAO.mostrar({_id: req.params.id})
        let timestamp = Date.now()
        let { body } = req
        
        let imgFileName = timestamp + '_' + req.files.img.name
        let newPath = path.normalize(__dirname + '/../../../api_img/projetos')

        await fs.promises.rename(req.files.img.path, `${newPath}/${imgFileName}`)
        await fs.promises.unlink(`${newPath}/${body.img_old}`)

        body.img = imgFileName
        delete body.img_old

        await ProjetosDAO.editar(documento, body)
        res.redirect('/home')
        return
    }else{
        res.redirect('/')
    }
}