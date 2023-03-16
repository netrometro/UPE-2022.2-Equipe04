import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export default async function routes(fastify: FastifyInstance, prisma: PrismaClient) {
    
    fastify.get('/produtos', async (request, reply) => {
        
        try{ 

            const produtos = await prisma.produtos.findMany({
            });
            reply.send(produtos);
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar produtos!'});
        }
    })

    fastify.get('/produtos/count', async (request, reply) => {
        
        try{
            
            const produtos = await prisma.produtos.count()
            reply.send(produtos)
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar produtos!'});
        
        }
    });

    interface IProdutoBody {
        tipo: string;
        tamanho: string;
        cor: string;
        material?: string;
        marca: string;
        quantidade: number;
        preco: number;
    };
    
    fastify.post<{Body: IProdutoBody}>('/produtos/create', async (request, reply) => {   
        
        try{
            const {tipo, tamanho, cor, marca, quantidade, preco} = request.body;
            await prisma.produtos.create({
                
                data: {
                    tipo, 
                    tamanho,
                    cor,
                    material: request.body.material,
                    marca,
                    quantidade, 
                    preco,
                },

            })

            reply.status(201).send({message: 'Produto criado com sucesso!'});
            console.log(`Produto criado com tipo=${tipo}, tamanho=${tamanho}, cor=${cor}, marca=${marca}, quantidade=${quantidade}, preco=${preco}`);
        } catch (error) {
                
            console.error(error);
            
            reply.status(400).send({message: 'Erro ao criar produto!'});
            
        }
    })
    
    interface IProdutoByIdParam {
        
        id: number
        
    };
    
    fastify.put <{Params: IProdutoByIdParam, Body:IProdutoBody}>('/produtos/update/:id', async (request, reply) => {
        
        const {id} = request.params;
        
        const {tipo, tamanho, cor, material, marca, quantidade, preco} = request.body;

        try{

            await prisma.produtos.update({
            
                where: { id: Number(id) },
            
                data: {
                    tipo, 
                    tamanho,
                    cor,
                    material,
                    marca,
                    quantidade, 
                    preco,
                },

            })

            reply.status(200).send({message: 'Produto atualizado com sucesso!'});

        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao atualizar produto!'});
        
        }

      })
      
      fastify.delete<{Params: IProdutoByIdParam}>('/produtos/delete/:id', async (request, reply) => {
        try{
            const {id} = request.params;
            
            await prisma.produtos.delete({

            where: { id: Number(id) }
            
            })

            reply.status(200).send({message: 'Produto deletado com sucesso!'});
        
        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao deletar produto!'});
        
        }

      })
    
};

// fastify.get('/users/count', async () => {
//     const count = await prisma.user.count()
//     return {count}
    
// })
