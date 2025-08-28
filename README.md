##### SETUP Instructions ###
1) set up the database by using: npm run db:setup
2) run : npm run dev

###### Tech Stack #######
Frontend: Next.js 13+ with TypeScript and Tailwind CSS
Backend: Next.js API Routes with TypeScript
Database: SQLite with raw SQL queries
Authentication: JWT tokens with bcrypt password hashing


##### Database Schema ######

The application uses a simplified single-table approach for survey data:
1) Users Table

Stores user account information
JWT authentication with bcrypt password hashing

2) Survey Responses Table

Single table containing all survey data (demographics, health, financial)
Linked to users via foreign key relationship


### Design Decisions ###

1) SQLite Database
SQLite was chosen for this assignment to ensure evaluators can run the application immediately with a simple npm run db:setup command. 
This eliminates external dependencies, Docker requirements, or cloud service account creation while still providing a full SQL relational database with proper relationships and constraints.

2) Single Table Survey Design
The survey data is stored in a single table rather than separate tables for each section. This design choice prioritizes development speed and simplicity while maintaining data integrity through proper typing and validation.

### Future Improvements ###

With additional development time, the following enhancements could be implemented:

1) Global state management with Zustand or Redux
2) React Query for server state management
3) Enhanced form validation 
4) Comprehensive error boundaries
5) Migration to PostgreSQL for production

