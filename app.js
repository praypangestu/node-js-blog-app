const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
// untuk membaca input dari user
app.use(bodyParser.json());

// Routes
// import routes yang sudah kita siapkan sebelumnya
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// Endpoint dibungkus di masing-masing route berikut, sehingga aksesnya nanti
// seperti: /api/auth/register
//             :/api/posts/1
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Database Connection
const sequelize = require('./config/database');
require('./models/User');
require('./models/Post');

// Koneksi ke database
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

// Menyatukan model database dan menjalankannya
// memastikan server dijalankan, setelah database berjalan
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    // Start Server
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((err) => console.error('Database sync error:', err));