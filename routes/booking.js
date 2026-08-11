import express from 'express';
import Booking from '../models/booking.js';
import response from '../helpers/helper.js';


const routeBooking = express.Router();

routeBooking.get('/', async(req, res)=>{
    try{
        const result = await Booking.find();
        response(200, result, 'Data Booking', res);
    }catch(err){
        res.status(500).send('Gagal Mengambil Data');
    }
});

export default routeBooking;