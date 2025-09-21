import mongoose from 'mongoose';

const RacketSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true
   },
   price: String, // Keep as String since your data has "$299 CAD" format
   category: String,
   weight: String,
   balance: String,
   playing_type: String,
   racket_style: String,
   image: String
});

export default mongoose.model('Racket', RacketSchema);