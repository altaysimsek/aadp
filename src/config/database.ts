import mongoose from 'mongoose';
import { Order } from '../models/order';

export async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://admin:password123@localhost:27017');
        console.log('MongoDB bağlantısı başarılı');

        // Örnek bir order oluştur
        await createSampleOrder();
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error);
        process.exit(1);
    }
}

async function createSampleOrder() {
    try {
        const sampleOrder = new Order({
            orderId: 'ORD-' + Date.now(),
            customerName: 'John Doe',
            amount: 99.99,
            paymentMethod: 'credit_card',
            status: 'pending'
        });

        await sampleOrder.save();
        console.log('Örnek order başarıyla oluşturuldu');

        // Tüm orderları listele
        const orders = await Order.find();
        console.log('Mevcut orderlar:', orders);
    } catch (error) {
        console.error('Order oluşturma hatası:', error);
    }
}

connectToDatabase()