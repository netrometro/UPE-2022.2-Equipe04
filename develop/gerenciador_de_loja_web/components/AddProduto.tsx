'use client';

import { api } from "@/app/lib/axios";
import { FormEvent, useState } from "react";

export function Produtos(){
  
  const [tipoProduto, setTipoProduto] = useState('');
  const [tamanhoProduto, setTamanhoProduto] = useState('');
  const [corProduto, setCorProduto] = useState('');
  const [materialProduto, setMaterialProduto] = useState('');
  const [marcaProduto, setMarcaProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState(0);
  const [precoProduto, setPrecoProduto] = useState(0.0);
  
  function createProduto(event: FormEvent){
    event.preventDefault();
    try{

      const response = api.post('/produtos/create', {
        tipo: tipoProduto,
        tamanho: tamanhoProduto,
        cor: corProduto,
        material: materialProduto,
        marca: marcaProduto,
        quantidade: quantidadeProduto,
        preco: precoProduto,

      });
      alert('Produto cadastrado com sucesso');
      console.log( response);
    
      setTipoProduto('');
      setTamanhoProduto('');
      setCorProduto('');
      setMaterialProduto('');
      setMarcaProduto('');
      setQuantidadeProduto(0);
      setPrecoProduto(0.0);

    }catch(err){
      console.log(err);
      alert('Erro ao cadastrar produto');
    }
  }
    
  return (
    <div> 
      <form onSubmit={createProduto}>
        
        <input type="text" placeholder="Tipo do produto" onChange={event => setTipoProduto(event.target.value)} value={tipoProduto}/>
        <br />
        <input type="text" placeholder="Tamanho do produto" onChange={event => setTamanhoProduto(event.target.value)} value={tamanhoProduto}/>
        <br />
        <input type="text" placeholder="Cor do produto" onChange={event => setCorProduto(event.target.value)} value={corProduto}/>
        <br />
        <input type="text" placeholder="Material do produto" onChange={event => setMaterialProduto(event.target.value)} value={materialProduto}/>
        <br />
        <input type="text" placeholder="Marca do produto" onChange={event => setMarcaProduto(event.target.value)} value={marcaProduto}/>
        <br />
        <input type="number" placeholder="Quantidade do produto" onChange={event => setQuantidadeProduto(parseInt(event.target.value))} value={quantidadeProduto}/>
        <br />
        <input type="number" placeholder="Preço do produto" onChange={event => setPrecoProduto(parseFloat(event.target.value))} value={precoProduto}/> 
        <br />
        <br />

        <button type="submit">Cadastrar</button>

      </form>

    </div>
  )
}

export async function getServerSideProps() {

  const [ProdutosCreateResponse, ListProdutosResponse] = await Promise.all([
    api.post('/produtos/create'),
    api.get('/produtos'),
  ]);

  return {
    props: {
      produtosCreate: ProdutosCreateResponse.data,
      ListProdutosResponse: ListProdutosResponse.data,
    }
  };
}