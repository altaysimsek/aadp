interface PaymentProcessor {
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
    // 
    private paymentProcessor;

    constructor(paymentProcessor: PaymentProcessor ){
        this.paymentProcessor = paymentProcessor
    }

    processOrder(){
        this.paymentProcessor.processPayment()
    }
}