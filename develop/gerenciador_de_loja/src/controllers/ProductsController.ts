import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify';

export default async function productsRoutes(fastify: FastifyInstance) {
    
    fastify.get('/products', async (request, reply) => {
        
        try{ 

            const products = await prisma.product.findMany({
            });
            reply.send(products);
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar produtos!'});
        }
    })

    fastify.get('/products/count', async (request, reply) => {
        
        try{
            
            const products = await prisma.product.count()
            reply.send(products)
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar produtos!'});
        
        }
    });

    interface IProductBody {
        name: string;
        price: number;
        size: string;
        stock: number;
        info: string;
        photo: string;
        supplierId: number;
    };
    
    fastify.post<{Body: IProductBody}>('/products/create', async (request, reply) => {   
        
        try{
            const {name, size, price, stock, info, photo, supplierId} = request.body;
            await prisma.product.create({
                
                data: {
                    name,
                    size,
                    price,
                    stock,
                    info,
                    photo,
                    supplierId,
                },

            })

            reply.status(201).send({message: 'Produto criado com sucesso!'});
            console.log(`Produto criado com nome=${name}, tamanho=${size}, info=${info}, quantidade=${stock}, preco=${price}, foto=${photo}, fornecedor=${supplierId}`);
        } catch (error) {
                
            console.error(error);
            
            reply.status(400).send({message: 'Erro ao criar produto!'});
            
        }
    })
    
    interface IProductByIdParam {
        
        id: number
        
    };
    
    fastify.put <{Params: IProductByIdParam, Body:IProductBody}>('/products/update/:id', async (request, reply) => {
        
        const {id} = request.params;
        
        const {name, size, price, stock, info, photo, supplierId} = request.body;

        try{

            await prisma.product.update({
            
                where: { id: Number(id) },
            
                data: {
                    name,
                    size,
                    price,
                    stock,
                    info,
                    photo,
                    supplierId,
                },

            })

            reply.status(200).send({message: 'Produto atualizado com sucesso!'});

        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao atualizar produto!'});
        
        }

      })
      
      fastify.delete<{Params: IProductByIdParam}>('/products/delete/:id', async (request, reply) => {
        try{
            const {id} = request.params;
            
            await prisma.product.delete({

            where: { id: Number(id) }
            
            })

            reply.status(200).send({message: 'Produto deletado com sucesso!'});
        
        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao deletar produto!'});
        
        }

      })
    
};


