module.exports.getProjetos = async (app, req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const ProjetosDAO = new app.src.model.ProjetosDAO()
    try{
        let projetosRes = await ProjetosDAO.mostrarTodos()
        res.json(projetosRes)
    }catch (err){
        console.error(err)
        res.status(500).json({error: "Ops! Parece que ocorreu um erro interno"})
    }
}

module.exports.getProjetoImg = async (app, req, res) => {
    const fs = require('fs')
    fs.readFile(`api_img/projetos/${req.params.img}`, (err, content)=>{
        if(err){
            res.status(500).json({error: err})
            return
        }
        res.writeHead(200, {"content-type": "image/jpg"})
        res.end(content)
    })
}