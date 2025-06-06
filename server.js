require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
.then(() =>{
    app.emit('pronto');
})
.catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const {middlewareGlobal , checkCsrEError,csrfMiddleware} = require('./src/middlewares/middlewares'); 
const csrf = require('csurf');

app.use(helmet());
app.use(express.urlencoded( { extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
secret: 'asdadasadff()',
store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
resave: false,
saveUninitialized: false,
cookie:{
    maxAge:1000 * 60 * 60 * 24 * 7,
    httpOnly: true
}
});

app.use(sessionOptions);
app.use(flash());

app.set('views',path.resolve(__dirname, 'src','views'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrEError);
app.use(csrfMiddleware);
app.use(routes);
app.on('pronto', () =>{
    app.listen(port, () =>{
        console.log('Acessar http://localhost:3000');
        console.log(`Servidor rodando na porta ${port}`);
         });
    
});


