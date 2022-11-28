import '../App.css';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import {estadocarrito} from '../Slicersreducers';
import { useSelector } from 'react-redux';
const Producto=(props)=>{
    const [alerta,setalerta]=useState("");
    const estadopedido=useSelector(state=>state.carrito.pedido);
    const dispatch=useDispatch();
    const agregaprod=(prod)=>{
        if(props.data.stock>0){
            let permitido=true;
            estadopedido.productos.map((item,index)=>{
                if(item.prod==props.data.name){
                    console.log("producto encontrado")
                    if(item.cantidad==props.data.stock){
                        permitido=false;
                    }
                }
            })
            if(permitido){
                dispatch(estadocarrito(prod));
            }else{
                setalerta("El producto no tiene existencias disponibles");

            }
        }else{
            setalerta("El producto no tiene existencias disponibles");

        }
        console.log(prod)
        
    }
    const cierramod=()=>{
        setalerta("");
    }
    if(alerta.length>0){
        return (
            <Fragment>
                <div className="modalact" >
                    <div className="TarjetaModal">
                        <p className="texto4">{alerta}</p>
                        <div>   
                            <button onClick={()=>{cierramod()}} className="botonprod" >Continuar</button>
                        </div>
                    </div>
                </div>
                <div className='tarjeta'>
                    <div className='contimg'>
                        <img src={props.image} className="imagen"/>
                    </div>
                    <p className='texto2'>{props.data.name}</p>
                    <div className='infprod'>
                        <p className='texto3'>Stock: {props.data.stock}</p>
                        
                        <p className='texto2'>${props.data.unit_price}</p>
                    </div>
                    <button onClick={()=>{agregaprod({
                        prod:props.data.name,
                        cantidad:1,
                        total:props.data.unit_price
                    })}} className='botonprod'>Agregar <i class="bi bi-cart3"></i></button>
                </div>
            </Fragment>    
        );

    }else{
        return (
            <div className='tarjeta'>
                <div className='contimg'>
                    <img src={props.image} className="imagen"/>
                </div>
                <p className='texto2'>{props.data.name}</p>
                <div className='infprod'>
                    <p className='texto3'>Stock: {props.data.stock}</p>
                    
                    <p className='texto2'>${props.data.unit_price}</p>
                </div>
                <button onClick={()=>{agregaprod({
                    prod:props.data.name,
                    cantidad:1,
                    total:props.data.unit_price
                })}} className='botonprod'>Agregar <i class="bi bi-cart3"></i></button>
            </div>  
        );

    }
    
}

export default Producto;