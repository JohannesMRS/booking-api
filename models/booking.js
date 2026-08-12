import mongoose, { mongo } from "mongoose";

const bookingSchema = new mongoose.Schema({
    nama_lengkap: {type: String, required: true},
    nomor_telepon: {type: String, required: true},
    no_kamar: {type: Number, required: true},
    email: {type: String, required: true},
    tgl_check_in: {type: Date, required: true},
    tgl_check_out: {type: Date, required: true},
    jumlah_tamu: {type: Number, required: true}
});

export default mongoose.model('Booking', bookingSchema, 'booking_activity');