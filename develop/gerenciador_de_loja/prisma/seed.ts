import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({ 
        data: {
            name: 'John Doe',
            email: 'johndoe1@email.com',
            password: '123456',
            role: 'ADMIN',  
            
        }
    })

    const supplier = await prisma.supplier.create({
        data: {
            name: 'Fornecedor 1',            
            phone: '11 99999-9999',
            info: 'Descrição do fornecedor 1',
            products: {
                createMany: {
                    data: [
                        {
                            name: 'Produto 1',
                            price: 10.00,
                            stock: 10,
                            info: 'Descrição do produto 1',
                        },
                        {
                            name: 'Produto 2',
                            price: 20.00,
                            stock: 20,
                            info: 'Descrição do produto 2',
                        }
                    ]
                }
            }
        }
                        

    })
}
main()