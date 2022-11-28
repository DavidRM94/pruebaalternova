
import '../App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {limpiacarrito} from '../Slicersreducers';
const Pedido=(props)=>{
    const [valortotal,setvalortotal]=useState(0);
    const estadopedido=useSelector(state=>state.carrito.pedido);
    const dispatch=useDispatch();
    console.log(estadopedido)
    useEffect(()=>{
        console.log("ejecuta useefect pedido");
        let total=0;
        estadopedido.productos.map((item,index)=>{total+=item.total});
        setvalortotal(total);
    },estadopedido.valores);
    const quitaprod=(prod)=>{
        dispatch(limpiacarrito({prod}));
    }
    const finalizapedido=()=>{
        let factura={
            productos:[...estadopedido.productos],
            Total:valortotal
        }
        console.log(factura)
    }
    if(estadopedido.productos.length>0){
        return (
            <div className='contpedido'>
                <h1>Pedido</h1>
                {
                    estadopedido.productos.map((item,index)=>{
                        return(
                            <div className='itempedido'>
                                <p className='texto3'>{item.prod}</p>
                                <p className='texto3'>Cant: {item.cantidad}</p>
                                <p className='texto3'>${item.total}</p>
                                <button onClick={()=>{quitaprod(item.prod)}} className='subbotonprod'><i class="bi bi-trash"></i></button>
                            </div>
                        )
                    })
                }
                <div className='resumenpedido'>
                    <p className='texto2'>Total: ${valortotal}</p>
                    <button onClick={()=>{finalizapedido()}} className='botonprod'>Pagar</button>
                </div>
            </div>
        );

    }else{
        return (
            <div className='contpedido'>
                <h1>Pedido</h1>
                <p>No hay productos</p>
                
            </div>
        );

    }
    
}

export default Pedido;