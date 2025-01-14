import mongoose from "mongoose";
import {
  DatabaseFactory,
  DatabaseSelection,
} from "../database-processor-factory";

export interface DatabaseStrategy {
  connect(): void;
  disconnect(): void;
  getConnection(): any;
}

interface PostgreImplementation {
  getPostgreVersion(): string;
}

export class MongoDbStrategy implements DatabaseStrategy {
  async connect() {
    try {
      await mongoose.connect("mongodb://admin:password123@localhost:27017");
      console.log("✅ MongoDB bağlantısı başarılı");
    } catch (e) {
      console.log("❌ MongoDB bağlantı hatası:", e);
    }
  }

  async disconnect() {
    try {
        await mongoose.disconnect();
        console.log("🔌 MongoDB bağlantısı başarıyla kesildi");
      } catch (e) {
        console.log("❌ MongoDB bağlantısı kesilemedi:", e);
      }
  }

  getConnection() {
    return mongoose.connection;
  }
}

export class PostgresStrategy
  implements DatabaseStrategy, PostgreImplementation
{
  connect() {
    return Promise.resolve();
  }

  disconnect() {
    return Promise.resolve();
  }

  getConnection() {
    return Promise.resolve();
  }

  getPostgreVersion() {
    return "15.0.0";
  }
}

export class DatabaseManager {
  private databaseStrategy: DatabaseStrategy;
  private static instance: DatabaseManager;

  private constructor(databaseSelection: DatabaseSelection) {
    this.databaseStrategy = DatabaseFactory.createDatabase(databaseSelection);
  }

  static getInstance(databaseSelection: DatabaseSelection) {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager(databaseSelection);
    }
    return DatabaseManager.instance;
  }

  createConnection() {
    this.databaseStrategy.connect();
  }

  destroyConnection() {
    this.databaseStrategy.disconnect();
  }

  getConnection() {
    return this.databaseStrategy.getConnection();
  }

  getPostgreVersion() {
    return (this.databaseStrategy as PostgresStrategy).getPostgreVersion();
  }
}

// export async function connectToDatabase() {
//     try {
//         await mongoose.connect('mongodb://admin:password123@localhost:27017');
//         console.log('MongoDB bağlantısı başarılı');
//         await mongoose.connect('mongodb://admin:password123@localhost:27017');

//         // Örnek bir order oluştur
//         await createSampleOrder();
//     } catch (error) {
//         console.error('MongoDB bağlantı hatası:', error);
//         process.exit(1);
//     }
// }

// async function createSampleOrder() {
//     try {
//         const sampleOrder = new Order({
//             orderId: 'ORD-' + Date.now(),
//             customerName: 'John Doe',
//             amount: 99.99,
//             paymentMethod: 'credit_card',
//             status: 'pending'
//         });

//         await sampleOrder.save();
//         console.log('Örnek order başarıyla oluşturuldu');

//         // Tüm orderları listele
//         const orders = await Order.find();
//         console.log('Mevcut orderlar:', orders);
//     } catch (error) {
//         console.error('Order oluşturma hatası:', error);
//     }
// }

// connectToDatabase()
