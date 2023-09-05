module.exports.getTecnologias = async (app, req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const TecnologiasDAO = new app.src.model.TecnologiasDAO()
    try{
      let tecnologiasRes = await TecnologiasDAO.mostrarTodos()
      res.json(tecnologiasRes)
    }catch (err){
      console.error(err)
      res.status(500).json({error: "Ops! Parece que ocorreu um erro interno"})
    }
}



module.exports.getTecnologiaImg = async (app, req, res) => {
  const fs = require('fs')
  fs.readFile(`api_img/tecnologias/${req.params.img}`, (err, content)=>{
      if(err){
          res.status(500).json({error: err})
          return
      }
      res.writeHead(200, {'content-type': 'image/jpg'})
      res.end(content)
  })
}

