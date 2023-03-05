const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
//const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
//const multer  = require('multer');
/* const storage = multer.diskStorage({
    destination: 'public/recursos/',
}); */

const app = express();
app.set('port', process.env.PORT || 9090);

/* app.use(multer({
    storage : storage,
    dest: 'public/recursos/',
    limits: {fileSize: 10000000}
}).single('avatar')) */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('conectado a mongoDB'))
.catch((error) => console.log(error));

app.use(cors())
app.use(express.json());
//app.use(express.urlencoded({ extended: true }))
/* app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json()) */
/* app.use(express.raw({type: 'image/*', limit: '10mb'})) */
app.use('/', routes)

const server = app.listen(app.get('port'), ()=>{
    console.log('servidor api-cancha corriendo')
});
server.setTimeout(30000);

