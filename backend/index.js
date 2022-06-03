const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: 'gilles@prisma.io',
            password: 'tested',
        },
    })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })