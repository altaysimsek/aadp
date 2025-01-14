import { DatabaseStrategy, MongoDbStrategy, PostgresStrategy } from "./managers/database-manager";

export enum DatabaseSelection {
    Mongo = 'mongo',
    Postgres = 'postgres'
}

export class DatabaseFactory {
    static createDatabase(databaseSelection: string): DatabaseStrategy {
        switch (databaseSelection) {
            case DatabaseSelection.Mongo: return new MongoDbStrategy();
            case DatabaseSelection.Postgres: return new PostgresStrategy();
            default: throw new Error('Invalid payment method');
        }
    }
}