Ecommerce Cart System

Clone the repository

## Installation

### Backend Setup

To install the dependencies for the backend, follow these steps:

1. Navigate to the root folder of the project:

   npm install

2. Set up environment variables

   Create config.env file in the backend/config/ directory

   /path/to/project
   ├── backend/
   │ ├── config/
   │ │ └── config.env <-- Create this file
   │ ├── controllers/
   │ ├── models/
   │ └── package.json
   └── frontend/

   add the provided configuration values to your config.env file

   PORT = 8000
   DB_URI = mongodb://localhost:27017/ecommerce-cart-system
   JWT_SECRET=trwjmnklywvbsppqw
   JWT_EXPIRES_TIME=7d
   COOKIE_EXPIRES_TIME=7

3. Create an 'upload' folder in the /backend directory.

4. Start server

   npm run dev

### Frontend Setup

To install the dependencies for the frontend, follow these steps:

1. Navigate to the frontend directory:

   cd your/project/path/frontend

2. Set up environment variables

   Create .env file in the frontend directory

   /path/to/project
   ├── backend/
   │ ├── config/
   │ │ └── config.env
   │ ├── controllers/
   │ ├── models/
   │ ├── server.js
   │ └── package.json
   └── frontend/
   ├── public/
   ├── src/
   ├── .env <-- The .env file for frontend configuration
   └── package.json

   add the provided configuration values to your .env file

   REACT_APP_STATIC_FILES_URL = "http://localhost:bakend-port/uploads/"

3. Start server

   npm start

After creating an account, change the user role to 'admin' manually.
