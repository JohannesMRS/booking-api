import express from 'express';
import connectDB from './models/db.js';
import Booking from './models/booking.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Konek');
});

app.get('/booking', async(req, res)=>{
    try{
        const result = await Booking.find({no_kamar: {$ne: 1}});

        if(result == false){
            return res.status(404).json({
                status: 'Data Not Found',
                data: null
            });
        }
        res.status(200).json(result);
    }catch(err){
        res.status(500).send('Gagal Mengambil Data');
    }
})

app.listen(port, ()=>{
    console.log(`connected successfully on port ${port}`);
});

connectDB();