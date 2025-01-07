import mongoose, { Schema, Document } from 'mongoose';

// Order için TypeScript interface
export interface IOrder extends Document {
    orderId: string;
    customerName: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

// MongoDB şeması
const OrderSchema: Schema = new Schema({
    orderId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    customerName: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentMethod: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true // createdAt ve updatedAt alanlarını otomatik ekler
});

// Model'i oluştur ve export et
export const Order = mongoose.model<IOrder>('Order', OrderSchema); 