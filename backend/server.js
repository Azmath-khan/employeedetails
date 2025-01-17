import express from 'express';
import cors from 'cors';

import config from './config.js';
import productRoute from './productRoute.js';
import employeeRoute from './EmployeeRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api', productRoute);

app.use('/api/employee', employeeRoute);
app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
