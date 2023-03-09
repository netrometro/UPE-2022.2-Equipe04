import {PrismaClient} from '@prisma/client'; 

const prisma = new PrismaClient(); 

async function main() { 
    const produtos = await prisma.produtos.create({
        data: {
            tipo: 'sapato',
            tamanho: '34',
            cor: 'preto',
            marca: 'miu miu',
            quantidade: 1,
            preco: 1000,
        }
    }) 
} 
    main()