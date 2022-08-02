const express = require('express');
// const bodyparser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

//mini app
const userRouter = require('./routers/userRouters');
const planRouter = require('./routers/planRouter');
const reviewRouter = require('./routers/reviewRouter');
const bookingRouter= require('./routers/bookingRouter')
// const authRouter = require('./routers/authRouter');
//base route
app.use('/user',userRouter);
app.use('/plans',planRouter);
app.use('/review',reviewRouter);
app.use('/booking',bookingRouter);
// const planModel = require('./models/planModel');

app.listen(4000,()=>{
    console.log("Up and running on 4000");
});