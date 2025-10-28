import express from 'express';
import Racket from '../models/Racket.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const rackets = await Racket.find();
        res.json(rackets);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// create a new racket
router.post('/', async (req, res) => {
    console.log("Received: ", req.body);
    const { name, price, category, weight, balance, playing_type, racket_style, image } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({msg: 'please include name and price'});
    }
         
    try {
        const racket = new Racket({
            name, 
            price, 
            category, 
            weight, 
            balance, 
            playing_type, 
            racket_style, 
            image
        });
        const saved = await racket.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.delete('/:name', async(req, res) => {
    try {
        console.log('delete request received for: ', req.params.name);
        const {name} = req.params;
        const deleted = await Racket.findOneAndDelete({name});
        if (!deleted) {
            return res.status(404).json({message: 'Racket not found'});
        }
        console.log('successfully deleted racket', deleted.name);
        res.json({message: `Racket ${name} removed`, deleted});
        
    } catch (err) {
        console.log('error deleting racket:', err.message);
        res.status(500).json({message: err.message});
    }
})

export default router;