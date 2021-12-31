import express from 'express';
import mongoose from 'mongoose';
import { ProductModel } from './models/Products';
import { UsersModel } from './models/Users';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3000', process.env.FRONT_END_URL],
    optionsSuccessStatus: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Credentials': true
    }
};

app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);

app.get('/getProducts', (req: any, res) => {
    try {
        if (!req.query.id && !req.query.name) {
            ProductModel.find({}, (err: any, docs: any) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(docs);
                }
            });
        } else if (req.query.id) {
            ProductModel.findById(req.query.id, (err: any, doc: any) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(doc);
                }
            });
        } else if (req.query.name) {
            ProductModel.findOne({ name: req.query.name }, (err: any, doc: any) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(doc);
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
});

app.post('/createProduct', async (req: any, res: any) => {
    try {
        const product = new ProductModel({
            url1: req.body.url1,
            url2: req.body.url2,
            name: req.body.name,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price
        });
        await product.save();
        res.json(product);
    } catch (e) {
        console.log(e)
    }
})

//delete product
app.delete('/deleteProduct/:id', async (req: any, res: any) => {
    try {
        ProductModel.findByIdAndDelete(req.params.id).exec((err: any, doc: any) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        });
    } catch (e) {
        console.log(e)
    }
})

//update product
app.put('/updateProduct', async (req: any, res: any) => {
    try {
        ProductModel.findById(req.body.id, (err: any, product: any) => {
            product.name = req.body.name || product.name;
            product.url1 = req.body.url1 || product.url1;
            product.url2 = req.body.url2 || product.url2;
            product.color = req.body.color || product.color;
            product.size = req.body.size || product.size;
            product.price = req.body.price || product.price;
            product.save();
            res.send("updated successfully");
        })
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/getUser', (req: any, res: any) => {
    try {
        if (req.query.email && req.query.password) {
            UsersModel.findOne({ email: req.query.email, password: req.query.password }, (err: any, doc: any) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(doc);
                }
            });
        } else if (req.query.email) {
            UsersModel.findOne({ email: req.query.email }, (err: any, doc: any) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(doc);
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
});

app.post('/createUser', async (req: any, res: any) => {
    try {
        const user = new UsersModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            telephone: req.body.telephone,
            orders: [[]],
            role: 'customer',
        });
        await user.save();
        res.json(user);
    } catch (e) {
        console.log(e)
    }
})

app.post('/updateUser', async (req: any, res: any) => {
    try {
        let user;
        if (req.body.name && req.body.email && req.body.password && req.body.address && req.body.telephone) {
            user = await UsersModel.findOne({ email: req.body.email, password: req.body.password });
            user.name = req.body.name || user.name;
            user.address = req.body.address || user.address;
            user.telephone = req.body.telephone || user.telephone;
        } else if (req.body.name && req.body.email && req.body.password) {
            user = await UsersModel.findOne({ email: req.body.email });
            user.password = req.body.password;
        }
        await user.save();
    } catch (e) {
        console.log(e)
    }
})

app.listen(process.env.PORT || 3001, () => {
    console.log('server started on port 3001');
})
