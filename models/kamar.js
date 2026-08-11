import mongoose, {mongo} from "mongoose";

const kamarSchema = new mongoose.Schema({
    no_kamar: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('Kamar', kamarSchema, 'kamar');