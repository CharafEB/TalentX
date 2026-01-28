import { PrismaClient } from '@prisma/client';
import { ITalentRepository } from '../../domain/repositories/ITalentRepository';

export class PrismaTalentRepository implements ITalentRepository {
    private prisma: PrismaClient;

    constructor({ prisma }: { prisma: PrismaClient }) {
        this.prisma = prisma;
    }
    async findAll(): Promise<any[]> {
        return this.prisma.talent.findMany({
            include: {
                user: {
                    select: {
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    },
                },
            },
        });
    }

    async findById(id: string): Promise<any | null> {
        return this.prisma.talent.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    },
                },
            },
        });
    }

    async findByUserId(userId: string): Promise<any | null> {
        return this.prisma.talent.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    },
                },
            },
        });
    }

    async update(id: string, data: any): Promise<any> {
        return this.prisma.talent.update({
            where: { id },
            data,
            include: {
                user: {
                    select: {
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    },
                },
            },
        });
    }
}
