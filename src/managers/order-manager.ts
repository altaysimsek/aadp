import { PaymentProcessorFactory, PaymentMethod } from "../payment-processor-factory";
export interface PaymentProcessor {
    processPayment(): void
}

interface TokenProcessor{
    getToken(): void
}

export class CreditCardProcessor implements PaymentProcessor{
    //Is it possible to come new payment processors like paypal etc.
    processPayment(){
        console.log('Payment will be processed by CreditCard...')
    }
}

export class PaypalProcessor implements PaymentProcessor, TokenProcessor{
    processPayment(){
        console.log('Payment will be processed by Paypal...')
    }
    getToken() {
        console.log('Get Token from Paypal API')
    }
}

export class KlarnaProcessor implements PaymentProcessor, TokenProcessor{
    processPayment(){
        console.log('Payment will be processed by Klarna...')
    }
    getToken() {
        console.log('Get Token from Klarna API')
    }
}

export class OrderManager{
    // S<O>LID Order Manager now fit to open/closed principle 
    private paymentProcessor;
    private static instance: OrderManager;


    private constructor(paymentMethod: PaymentMethod ){
        this.paymentProcessor = PaymentProcessorFactory.createPaymentProcessor(paymentMethod)
    }

    static getInstance(paymentMethod: PaymentMethod){
        //Singleton pattern implementation
        if(!OrderManager.instance){
            OrderManager.instance = new OrderManager(paymentMethod)
        }
        return OrderManager.instance
    }

    processOrder(){
        this.paymentProcessor.processPayment()
    }

    setStrategy(paymentMethod: PaymentMethod){
        this.paymentProcessor = PaymentProcessorFactory.createPaymentProcessor(paymentMethod)
    }
}