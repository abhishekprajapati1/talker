[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


# Talker

This project is a chat web application developed in NestJS and NextJS frameworks. Motive is to learn web sockets using socket.io library. User interface is not optimized for larger screens such as laptops and pc(s). Best viewed on mobile devices.


## Authors

- [@abhishekprajapati1](https://www.github.com/abhishekprajapati1)


## Tech Stack

**Client:** NextJS, Redux Toolkit, TailwindCSS, MUI, Tanstack Query, Axios, DayJS, socket.io-client

**Server:** NestJS with ExpressAdapter, SQLite, PrismaORM, swagger, socket.io


## Features

- Contact Book
- Realtime Messaging
- Realtime User Search
- User Registration/Login
- Double Layer Authentication (REST + WS) with secure http cookies.
- JWT rotation with refresh token.


## Setup & Installation (Local)

First clone the repo or download the zip file. Open the projects root directory in a terminal.

#### Navigate to backend directory

```
cd backend
```
Install packages
```
pnpm install
``` 

Run migrations and generate types
```
npx prisma migrate dev <name_for_migration>
```

Run the development server
```
pnpm start:dev
```
Or you can build and run the production server for better response
```
pnpm build && pnpm start
```

#### Navigate to client directory
Now open a new terminal in the root of the project download and navigate to client directory.
```
cd client
```

Install packages and dependencies
```
pnpm install
```

Run the development server
```
pnpm dev
```
Or you can build and run the production server for better response
```
pnpm run build && pnpm run start
```

That's it now you can open this url in new brower window/tab. [http://localhost:3000/](http://localhost:3000/).

For the overview of apis you can visit [http://localhost:4000/docs/](http://localhost:4000/docs/). (Make sure the backend server is running)