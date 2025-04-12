const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectToMongoDB = require('./config/mongoConnection'); 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;


// Connect to MongoDB
connectToMongoDB();

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat Application API',
      version: '1.0.0',
      description: 'API documentation for the Chat Application',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ['./routes/*.js'], // Path to route files for Swagger annotations
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Setup Check Route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger documentation available at :- ${BASE_URL}/api-docs`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});


