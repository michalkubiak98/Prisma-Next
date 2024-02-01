# Prisma Next Project Setup Documentation

This README provides a comprehensive guide on setting up, running, and managing the Prisma Next project. It covers everything from cloning the repository to seeding the database and launching Prisma Studio for database management.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Initialize and Setup Prisma](#initialize-and-setup-prisma)
- [Seed the Database](#seed-the-database)
- [Launch Prisma Studio (Optional)](#launch-prisma-studio-optional)
- [Running the Next.js Application](#running-the-nextjs-application)

## Prerequisites

Before you begin, make sure you have the following prerequisites:

- Node.js and npm installed on your system.
- Docker installed for running the MySQL database container.

## Getting Started

1. Clone the Prisma Next project repository:

    ```bash
    git clone https://github.com/your-username/Prisma-Next.git
    cd Prisma-Next
    ```

2. Install project dependencies:

    ```bash
    npm install
    ```

## Database Setup

1. Start a MySQL Docker container with a secure password. Replace `yourpassword` with your chosen password:

    ```bash
    docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 -d mysql:latest
    ```

2. Ensure the `.env` file in the project root directory contains the correct database connection string:

    ```env
    DATABASE_URL="mysql://root:yourpassword@localhost:3306/mydb"
    ```

## Initialize and Setup Prisma

Generate the Prisma client and push the schema to your database:

    ```bash
    npx prisma generate
    npx prisma db push
    ```

## Seed the Database

Populate your database with initial data using the seeding script:

    ```bash
    npm run seed
    ```

## Launch Prisma Studio (Optional)

For database management and visualization, launch Prisma Studio:

    ```bash
    npx prisma studio
    ```


## Running the Next.js Application

Start the development server to run your Next.js application:

    ```bash
    npm run dev
    ```

Your application will be available at http://localhost:3000.

