import express from 'express';
import Booking from '../models/booking.js';
import Kamar from '../models/kamar.js';
import response from '../helpers/helper.js';
import {body, validationResult} from 'express-validator';


const routeBooking = express.Router();

routeBooking.get('/', async(req, res)=>{
    try{
        const result = await Booking.find();
        response(200, result, 'Data Booking', res);
    }catch(err){
        res.status(500).send('Gagal Mengambil Data');
    }
});

routeBooking.get('/search', async (req, res)=>{
    try{
        // const {no_kamar} = req.query;

        const findKamar = await Kamar.findOne({no_kamar: req.query.no_kamar});

        if(findKamar == null){
            return response(404, null, 'Data Tidak Ditemukan', res);
        }

        if(findKamar.isBooked == true){
            return response(409, null, 'Kamar sudah di booking', res);
        }
        response(200, findKamar, 'Kamar tersedia', res);

    }catch(err){
        response(500, null, 'Gagal Mencari Data', res);
    }
});


routeBooking.post('/search',[
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('nomor_telepon').isMobilePhone('id-ID').withMessage('Invalid Phone Number')
]
    ,async(req, res)=>{
        try{
            const {nama_lengkap, nomor_telepon, email, tgl_check_in, tgl_check_out, jumlah_tamu} = req.body;
            // const {id_kamar} = req.params;
            const {no_kamar} = req.query;
            const hargaAwal = 1370000;
            const tglCheckIn = new Date(tgl_check_in);
            const tglCheckOut = new Date(tgl_check_out);

            const selisihMilidetik = tglCheckOut - tglCheckIn;
            const selisihHari = selisihMilidetik / (1000 * 60 * 60 * 24);
            const total_harga = hargaAwal * selisihHari;
            

            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return response(400, errors.array(), 'Validasi gagal', res);
            }

            const findKamar = await Kamar.findOne({
                no_kamar: req.query.no_kamar
            });

            if(findKamar.isBooked == true){
                return response(409, null, 'Kamar sudah di booking', res);
            }

            const result = await Booking.create({
                nama_lengkap,
                nomor_telepon,
                no_kamar: req.query.no_kamar,
                email,
                tgl_check_in,
                tgl_check_out,
                jumlah_tamu,
                total_harga: total_harga,
            });

            const updateKamar = await Kamar.findOneAndUpdate(
                {no_kamar: req.query.no_kamar},
                {$set: {
                    isBooked: true,
                }}
            )

            response(200, result, 'Data berhasil ditambah', res);
        }catch(err){
            response(500, null, err.message, res);
        }
})




export default routeBooking;