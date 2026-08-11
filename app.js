import express from 'express';
import connectDB from './models/db.js';
import Booking from './models/booking.js';
import response from './helpers/helper.js';
import booking from './routes/booking.js';


const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Konek');
});

app.use('/booking', booking);

app.use((req, res)=>{
    res.status(404).json({
        status_code: 404,
        msg: 'Page Not Found',
        data: null,
    });
})



app.listen(port, ()=>{
    console.log(`connected successfully on port ${port}`);
});

connectDB();