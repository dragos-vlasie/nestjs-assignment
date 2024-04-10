# NestJS CRUD App

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [How to Run the Application](#how-to-run-the-application)
- [Technologies Used](#technologies-used)

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Install Dependencies:**

   Navigate into the project directory and install the dependencies:

   ```bash
   cd your-project-directory
   npm install
   ```

3. **Environment Configuration:**

   Create a `.env` file in the root of your project and add the necessary environment variables. Refer to `.env.example` for a list of required variables.

4. **Database Setup:**

Database Setup:

Install PostgreSQL using Homebrew (if not already installed):

 ```bash
brew install postgresql
Start PostgreSQL service:
  ```

```bash
brew services start postgresql
Set up your database and configure the connection in the .env file.
  ```
   Set up your database and configure the connection in the `.env` file.


## How to Run the Application

Start the application using the following command:

```bash
npm run start
```

The application will start running on http://localhost:3000/
```bash
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Technologies Used

List the technologies and frameworks used in your project:

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Swagger](https://swagger.io/)
- [JWT](https://jwt.io/)

