import express from 'express';
import mongoose from 'mongoose';
import { ProductModel } from './models/Products';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);

app.get('/getProducts', (req: any, res) => {
    if (!req.query.id && !req.query.name) {
        ProductModel.find({}, (err: any, docs: any) => {
            if (err) {
                res.json(err);
            } else {
                res.json(docs);
            }
        });
    } else if(req.query.id){
        ProductModel.findById(req.query.id, (err: any, doc: any) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        });
    } else if (req.query.name) {
        ProductModel.findOne({name: req.query.name}, (err: any, doc: any) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        });
    }
});

app.post('/createProduct', async (req: any, res: any) => {
    const product = new ProductModel({
        url1: req.body.url1,
        url2: req.body.url2,
        name: req.body.name,
        color: req.body.color,
        size: req.body.size
    });
    await product.save();
    res.json(product);
})

app.listen(3001, () => {
    console.log('server started on port 3001');
})
