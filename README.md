# Mutual Fund Web App

This is a simple MERN stack application that allows users to:

- Register and log in
- Search for mutual funds
- View mutual fund details
- Save and remove favorite funds

## Technologies Used

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB Atlas
- Authentication: JWT + bcrypt

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/sumanpanda27/mutual_fund_client_repo
   git clone https://github.com/sumanpanda27/mutual_funds_server_repo
   ```

2. Set up the backend:

   ```bash
   cd mutual_funds_server_repo
   npm install
   # Create a .env file with MONGO_URI, JWT_SECRET, PORT
   npm run dev
   ```

3. Set up the frontend:

   ```bash
   cd mutual_fund_client_repo
   npm install
   # Create a .env file with VITE_API_BASE_URL
   npm run dev
   ```

## Deployed Links

- **Frontend:** [https://mutual-fund-client-repo.onrender.com](https://mutual-fund-client-repo.onrender.com)
- **Backend:** [https://mutual-funds-server-repo.onrender.com](https://mutual-funds-server-repo.onrender.com)

## License

MIT © 2025

