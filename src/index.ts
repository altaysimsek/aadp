import { OrderManager, CreditCardProcessor, PaypalProcessor, KlarnaProcessor  } from "./order-manager";

const creditCardProcessor = new CreditCardProcessor()
const paypalProcessor = new PaypalProcessor()
const KlarnalarnaProcessor = new KlarnaProcessor()

//TODO: Implements a payment processor factory
//TODO: Convert this fully to strategy pattern

//TODO: Create a test structure with vitest
//TODO: Find new real scenerios 


const orderManager = new OrderManager(paypalProcessor)

orderManager.processOrder()

