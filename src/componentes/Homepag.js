
import '../App.css';
import { inventario } from '../inventario.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect,useState } from 'react';
import Producto from './Producto';
import Pedido from './Pedido';
import axios from 'axios';
const Homepag=(props)=>{
    const [imagenesprod,setimagenesprod]=useState([]);
    const [imagenesprod2,setimagenesprod2]=useState([]);
    const [listinv,setlistinv]=useState(inventario);
    const [listinv2,setlistinv2]=useState(inventario);
    const [itemfind,setitemfind]=useState("")
    console.log(inventario)
    useEffect(()=>{
        try{
            axios.get("https://dummyapi.io/data/v1/post",{
                    headers: {
                        "app-id":"6300429055fb0cac79259c03"
                    }
                }).then((res)=>{
                    console.log(res);
                    let rutasimg=[];
                    rutasimg=res.data.data.map((item)=>item.image);
                    setimagenesprod([...rutasimg]);
                    setimagenesprod2([...rutasimg]);
                })
        }catch{

        }
    

    },[])
    const tipbusqueda=(even)=>{
        console.log(even.target.value)
        setitemfind(even.target.value)
    }
    const filtraprod=()=>{
        let copiaprod=[];
        let copiaimg=[]
        let posicion=-1;
        listinv2.products.map((item,index)=>{
            if(item.name==itemfind){
                posicion=index;
            }
        })
        if(posicion>=0){
            copiaprod.push(JSON.parse(JSON.stringify(listinv2.products[posicion])) )
            copiaimg.push(imagenesprod2[posicion])
        }else{
            listinv2.products.map((item,index)=>{
                if(item.type==itemfind){
                    copiaprod.push(JSON.parse(JSON.stringify(item)))
                    copiaimg.push(imagenesprod2[index]);
                }})
        }
        if(copiaprod.length>0){
            console.log(copiaprod)
            setlistinv({products:[...copiaprod]});
            setimagenesprod([...copiaimg])
        }
    }
    return (
        <div className='contcentral'>
            
            <div className='secprod'>
                {
                    listinv.products.map((item,index)=>{
                        return(<Producto image={imagenesprod[index]} data={item}></Producto>)
                    })
                }
            </div>
            <div className='secped'>
                <Pedido></Pedido>
                <div className='busqueda'>
                    <input onChange={tipbusqueda} type="text" className='campotexto' placeholder='Buscar' value={itemfind}></input>
                    <button onClick={()=>{filtraprod()}} className='subbotonprod'><i class="bi bi-search"></i></button>
                </div>
            </div>
        </div>
    );
}

export default Homepag;
