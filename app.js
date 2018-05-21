const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./routes/index')
const siswa = require('./routes/siswa')
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


//setup view engine/
app.set('views', __dirname+'/views/')
app.set('view engine', 'ejs')



//body parser
app.use(bodyParser.urlencoded({
	extended: false
}))

//membuar folder static public
app.use(express.static('public'))


app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(`Server Start on ${port}`);
})
//app.listen(5432, () => console.log('Server Success berjalan di http://localhost:5432'))