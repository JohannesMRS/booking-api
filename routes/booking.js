import express from 'express';
import Booking from '../models/booking.js';
import Kamar from '../models/kamar.js';
import response from '../helpers/helper.js';
import {body, validationResult} from 'express-validator';
import { getBooking ,postBooking } from '../controller/bookingController.js';


const routeBooking = express.Router();

routeBooking.get('/', async(req, res)=>{
    try{
        const result = await Booking.find();
        response(200, result, 'Data Booking', res);
    }catch(err){
        res.status(500).send('Gagal Mengambil Data');
    }
});

routeBooking.get('/search', getBooking);


routeBooking.post('/search',[
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('nomor_telepon').isMobilePhone('id-ID').withMessage('Invalid Phone Number')
]
,postBooking);




export default routeBooking;