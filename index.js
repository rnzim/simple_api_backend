const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/video',(req,res)=>{
    fs.readFile('./database/url.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Ocorreu um erro ao ler o arquivo:', err);
        } else {
          console.log('Conteúdo do arquivo:');
          console.log(data);
          res.status(200).json({url:data.split('\n')})
        }
      });
    
})
app.post('/',(req,res)=>{
    var url = req.body.url
   fs.writeFile('./database/url.txt','\n'+url,{flag:'a'},(err)=>{
        if(err){
            console.log(err)
        }
   })
   res.redirect('/')
})


app.listen(3000,()=>{console.log('run...')})