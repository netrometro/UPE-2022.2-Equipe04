import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.upsert({
            where: {
                email: 'doejohn@email.com'
            }, 
            update: {
                name: 'Doe John',
                email: 'doejohn@email.com',
                password: '123456',
                role: 'ADMIN', 
            },
            create: {
                name: 'Doe John',
                email: 'doejohn@email.com',
                password: '123456',
                role: 'ADMIN',  
                
            }
        });

        const supplier = await prisma.supplier.upsert({
            where: {
                id: 1
            },
            update: {
                name: 'Fornecedor 1',
                phone: '11 99929-9999',
                info: 'Descrição do fornecedor 1',
                products: {
                    connect:[{id: 1}]
                }
            },
            create: {
                name: 'Fornecedor 1',            
                phone: '11 99929-9999',
                info: 'Descrição do fornecedor 1',
            }
        });

        const product = await prisma.product.upsert({
            where: {
                id: 1
            },

            update: {
                name: 'Produto 1',
                size: 'M',
                price: 100,
                stock: 10,
                info: 'Descrição do produto 1',
                photo: 'https://www.google.com.br/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                supplierId: 1,
            },
            
            create: {
                    name: 'Produto 1',
                    size: 'M',
                    price: 100,
                    stock: 10,
                    info: 'Descrição do produto 1',
                    photo: 'https://www.google.com.br/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                    supplierId: 1,
                }

        })    
    }

main()
