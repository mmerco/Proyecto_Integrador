import express from 'express';
import mainRoutes from './src/routes/mainRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import shopRoutes from './src/routes/shopRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js'

const PORT = 4000;
const app = express();


// STATIC FOLDER
app.use(express.static('public'));


// ENGINE
app.set('views', './src/views');
app.set('view engine', 'ejs');


// ROUTES
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () =>
  console.log(`Server corriendo en http://localhost:${PORT}`)
);
