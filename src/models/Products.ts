import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    url1: {
        type: String,
        required: true
    },
    url2: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

const ProductModel = mongoose.model('products', ProductSchema);
export { ProductModel };