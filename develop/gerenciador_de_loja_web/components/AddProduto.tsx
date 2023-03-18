'use client';

import { api } from "@/app/lib/axios";
import { FormEvent, useState } from "react";

export function Produtos(){
  
  const [productName, setproductName] = useState('');
  const [productSize, setproductSize] = useState('');
  const [productPhoto, setproductPhoto] = useState('');
  const [productSupplier, setproductSupplier] = useState('');
  const [productInfo, setproductInfo] = useState('');
  const [productStock, setproductStock] = useState(0);
  const [productPrice, setproductPrice] = useState(0.0);
  
  function createProduct(event: FormEvent){
    event.preventDefault();
    try{

      const response = api.post('/products/create', {
        name: productName,
        size: productSize,
        photo: productPhoto,
        supplier: productSupplier,
        info: productInfo,
        stock: productStock,
        price: productPrice,

      });
      alert('Produto cadastrado com sucesso');
      console.log( response);
    
      setproductName('');
      setproductSize('');
      setproductPhoto('');
      setproductSupplier('');
      setproductInfo('');
      setproductStock(0);
      setproductPrice(0.0);

    }catch(err){
      console.log(err);
      alert('Erro ao cadastrar produto');
    }
  }
    
  return (
    <div> 
      <form onSubmit={createProduct}>
        
        <input type="text" placeholder="name do produto" onChange={event => setproductName(event.target.value)} value={productName}/>
        <br />
        <input type="text" placeholder="size do produto" onChange={event => setproductSize(event.target.value)} value={productSize}/>
        <br />
        <input type="text" placeholder="photo do produto" onChange={event => setproductPhoto(event.target.value)} value={productPhoto}/>
        <br />
        <input type="text" placeholder="supplier do produto" onChange={event => setproductSupplier(event.target.value)} value={productSupplier}/>
        <br />
        <input type="text" placeholder="info do produto" onChange={event => setproductInfo(event.target.value)} value={productInfo}/>
        <br />
        <input type="number" placeholder="stock do produto" onChange={event => setproductStock(parseInt(event.target.value))} value={productStock}/>
        <br />
        <input type="number" placeholder="Preço do produto" onChange={event => setproductPrice(parseFloat(event.target.value))} value={productPrice}/> 
        <br />
        <br />

        <button type="submit">Cadastrar</button>

      </form>

    </div>
  )
}

export async function getServerSideProps() {

  const [ProdutosCreateResponse, ListProdutosResponse] = await Promise.all([
    api.post('/products/create'),
    api.get('/products'),
  ]);

  return {
    props: {
      produtosCreate: ProdutosCreateResponse.data,
      ListProdutosResponse: ListProdutosResponse.data,
    }
  };
}