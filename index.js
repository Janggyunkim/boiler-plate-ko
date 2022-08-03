const express = require('express')    // 다운 받은 express 모듈을 가져옴
const app = express()                 // function을 가져와서 새로운 app을 만들고
const port = 5000     
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");                

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());

//mongoDB 연결 
//연결 MongDB Connected...되었나 확인하고 안 되었을 때, Network Access에 IP 추가 필요. 회사 망이어서 그런 것 같음
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))


app.get('/', (req, res) => {         
  res.send('Hello World!~~')            // root directory에 오면 hello-world를 출력
})

app.post('/register', (req, res) => {

  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.listen(port, () => {              // 5000번 실행
  console.log(`Example app listening on port ${port}!`)
})