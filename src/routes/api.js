module.exports = async (app)=>{

  //chamadas
  
  app.get('/api/projetos', async (req, res)=>{
    app.src.controllers.api.projetos.getProjetos(app, req, res)
  })
  
  app.get('/projetos_img/:img', async (req, res)=>{
    await app.src.controllers.api.projetos.getProjetoImg(app, req, res)
  })
  
  app.get('/api/tecnologias', async (req, res)=>{
    await app.src.controllers.api.tecnologias.getTecnologias(app, req, res)
  })
  
  app.get('/tecnologias_img/:img', async (req, res)=>{
    await app.src.controllers.api.tecnologias.getTecnologiaImg(app, req, res)
  })

}