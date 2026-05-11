import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        const url = new URL(process.env.DATABASE_URL);

        const adapter = new PrismaMariaDb({
            host: url.hostname,
            port: parseInt(url.port) || 3306,
            user: url.username,
            password: decodeURIComponent(url.password), // Decodifica caracteres especiais na senha
            database: url.pathname.substring(1), // Remove a '/' inicial
        });

        super({ adapter });
    }
}