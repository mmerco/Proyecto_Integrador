import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mainRoutes from './src/routes/mainRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import shopRoutes from './src/routes/shopRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js'

const PORT = process.env.PORT || 4000;
const app = express();


// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'Funkoshop',
  cookie: { maxAge: 60000 * 15 },
  resave: false,
  saveUninitialized: false,
}));
app.use(methodOverride('_method'));


// STATIC FOLDER
app.use(express.static('public'));


// ENGINE
app.set('views', './src/views');
app.set('view engine', 'ejs');


// ROUTES
app.use('/auth', authRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/', mainRoutes);


// INVALID ROUTES
app.use('/', (req, res) => {
  let response = {
    error: true,
    code: 404,
    msj: '<h1>URL invalida</h1>'
  }

  res.status(response.code).send(response.msj);
})


// PORT
app.listen(PORT, () =>
  console.log(`Server corriendo en http://localhost:${PORT}`)
);
