import mongoose from 'mongoose';

// Connect to MongoDB

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export const disconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};





