import express from 'express';
import mainRoutes from './src/routes/mainRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const PORT = 4000;
const app = express();

app.use(express.static('public'));

app.use('/', mainRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () =>
  console.log(`Server corriendo en http://localhost:${PORT}`)
);
