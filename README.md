Before running anything, run this command in both frontend and backend folders:
npm install

To run the frontend locally:
npm run start

To run the backend locally:
npm run dev

To set up and use the database with Prisma:

Generate Prisma client:
npx prisma generate

Initialize and run migrations in development:
npx prisma migrate dev --name init

Environment variables required:

For frontend:
REACT_APP_BACKEND_API_URL — backend API URL

For backend:
JWT_TOKEN_KEY — JWT secret key
DATABASE_URL — database connection URL

