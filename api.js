//configs do servidor
const app = require('./configs/server')
const dbconfig = require('./configs/database')

var porta = process.env.PORT || 3000

app.listen(porta, ()=>{
  console.log(`Servidor rodando em localhost:${porta}`)
})

process.on('exit', ()=>{
  dbconfig.client.close()
})