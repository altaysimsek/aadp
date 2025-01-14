import { CreditCardProcessor, PaypalProcessor, KlarnaProcessor, PaymentProcessor } from "./managers/order-manager";

export enum PaymentMethod {
    CreditCard = 'credit_card',
    Paypal = 'paypal',
    Klarna = 'klarna'
}

export class PaymentProcessorFactory {
    static createPaymentProcessor(paymentMethod: string): PaymentProcessor {
        switch (paymentMethod) {
            case PaymentMethod.CreditCard: return new CreditCardProcessor();
            case PaymentMethod.Paypal: return new PaypalProcessor();
            case PaymentMethod.Klarna: return new KlarnaProcessor();
            default: throw new Error('Invalid payment method');
        }
    }
}