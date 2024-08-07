import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './src/routes/auth.routes.js';
import listingRouter from './src/routes/list.routes.js';
import userRouter from './src/routes/user.routes.js';
import { swaggerSpec, swaggerUi } from './src/swagger.js';


const port  = 5001;


const app = express();
app.use(cors('*'));


app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON:', err.message);
    return res.status(400).send('Invalid JSON');
  }
  next();
})
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to My application." });
  });

  mongoose
  .connect("mongodb://127.0.0.1:27017/realEstate", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  }).then(y=>{
    console.log("connect DB")
})
.catch((error) => {
    console.log(error);
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', router);
app.use("/api/listing", listingRouter); 
app.use("/api/user",userRouter);


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

  const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});

