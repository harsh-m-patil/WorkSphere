# WorkSphere

> Group No - 35

## Description

- Freelancer/Job Board similar to Fiverr/LinkedIn

## Demo

[![Demo Video](https://img.youtube.com/vi/ykLvB1Hzy9o/0.jpg)](https://www.youtube.com/watch?v=ykLvB1Hzy9o)

## Performance Results

| Metric     | Without Cache | With Cache | Improvement      |
| ---------- | ------------- | ---------- | ---------------- |
| **Min**    | 8 ms          | 1 ms       | **87.5% faster** |
| **Max**    | 79 ms         | 41 ms      | **48.1% faster** |
| **Mean**   | 10.4 ms       | 2.1 ms     | **79.8% faster** |
| **Median** | 10.1 ms       | 2 ms       | **80.2% faster** |
| **P95**    | 13.1 ms       | 3 ms       | **77.1% faster** |
| **P99**    | 26.8 ms       | 4 ms       | **85.1% faster** |

## Team Members

| Name                        | Roll No      |
| --------------------------- | ------------ |
| Harshawardhan Mahadev Patil | S20220010167 |
| Sushant Gadyal              | S20220010218 |
| Satish Anantrao Pandhare    | S20220010163 |
| Vighnesh Suryakant Barage   | S20220010033 |
| Rahul Banoth                | S20220010031 |

## Tech Stack

<div align="left">
  <h3>Frontend</h3>  
  <img src="https://skillicons.dev/icons?i=react" height="30" alt="react logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=tailwind" height="30" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=vite" height="30" alt="vite logo"  />
  <img width="12" />
</div>

<div align="left">
  <h3>Backend</h3>  
  <img src="https://skillicons.dev/icons?i=js" height="30" alt="javascript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=express" height="30" alt="express logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="30" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=mongodb" height="30" alt="mongodb logo"  />
  <img width="12" />
</div>

## Instructions

### Frontend

1. Go to client directory

```bash
# WorkSphere >
cd client
```

2. Install dependencies

```bash
# WorkSphere/client >
npm install
```

3. Run the development server

```bash
# WorkSphere/client >
npm run dev
```

### Backend

> [!NOTE]
> Make sure you have mongodb installed

1. Go the server directory

```bash
# WorkSphere >
cd server
```

2. Install dependencies

```bash
# WorkSphere/server >
npm i
```

3. Generate Dummy Data

```bash
# WorkSphere/server >
node data/generateData.js
```

4. Create .env

```bash
# WorkSphere/server >
touch .env

# and paste the following
PORT=3000
DB_URI=mongodb://localhost:27017/WorkSphere
NODE_ENV=development
JWT_SECRET=<ANY_JWT_SECRET_KEY>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

5. Run the server

```bash
npm run dev
```

## Docs

API Docs available at `localhost:3000/docs` or [Here](https://worksphere-dq95.onrender.com/docs)

## Demo

### Home Page

![Project Banner](./assets/worksphere.png)

### Find Works Page

![find works](./assets/works.png)
![find works](./assets/workDetail.png)

### Freelancer Dashboard

![Freelancer Dashboard](./assets/freelancerDashboard.png)
![Freelancer ](./assets/freelancerApplications.png)

### Admin Dashboard

![Admin Dashboard](./assets/adminDashboard.png)

### Admin Dashboard Analytics

![Admin Analytics](./assets/adminAnalytics.png)
![Admin Analytics](./assets/adminManageClients.png)

### Client Dashboard

![Client Dashboard](./assets/clientDashboard.png)

### Business Page

![Business Page](./assets/biz.png)

### About Us

![About Us](./assets/about.png)
