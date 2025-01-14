import { OrderManager } from "./managers/order-manager";
import { PaymentMethod } from "./payment-processor-factory";

import { DatabaseManager } from "./managers/database-manager";
import { DatabaseSelection } from "./database-processor-factory";

//TODO: Implements a payment processor factory ✅
//TODO: Convert this fully to strategy pattern ✅

//Next Week:
//TODO: What if already connected to database? ✅ make it singleton 
//TODO: Implement a singleton pattern for database connection ✅
//TODO: Implement a factory for databaseStrategies ✅ 
//TODO: Create a test structure with vitest

//TODO: Think about a complicated scenerio for order manager
//TODO: Turn this project web server, and implement a rest api
//TODO: Our architecture

const orderManager = OrderManager.getInstance(PaymentMethod.Paypal);

orderManager.processOrder();

orderManager.setStrategy(PaymentMethod.Klarna);

orderManager.processOrder();

const databaseManager = DatabaseManager.getInstance(DatabaseSelection.Mongo);

databaseManager.createConnection();

const connection = databaseManager.getConnection();

// console.log(connection);

databaseManager.destroyConnection();
