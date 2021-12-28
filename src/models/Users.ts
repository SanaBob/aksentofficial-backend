import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    orders: {
        type: [[String]],
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const UsersModel = mongoose.model('users', UsersSchema);
export { UsersModel };