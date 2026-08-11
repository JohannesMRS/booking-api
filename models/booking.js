import mongoose, { mongo } from "mongoose";

const bookingSchema = new mongoose.Schema({
    nama: {type: String, required: true},
    no_kamar: {type: Number, required: true},
    tgl_check_in: {type: Date, required: true},
    tgl_check_out: {type: Date, required: true}
});

export default mongoose.model('Booking', bookingSchema, 'booking_activity');