import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({ 
        data: {
            name: 'John Doe',
            email: 'johndoe@email.com',
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
                connect: {
                    id: 1
                }
            }
        }

    })

    const product = await prisma.product.create({
        data: {
            name: 'Produto 1',
            price: 10.50,
            info: 'Descrição do produto 1',
            photo: 'https://www.google.com.br/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
            supplier: {
                connect: {
                    id: 1
            }
        }
    }
    })
}

main()