import { createSlice } from "@reduxjs/toolkit";

const Slicersreducers=createSlice({
    name:"carrito",
    initialState:{
        pedido:{
            productos:[],
            valortot:0
        }
    },    
    reducers:{
        estadocarrito:(state,action)=>{
            if(state.pedido.productos.length>0){
                let index=-1;
                state.pedido.productos.map((item,i)=>{
                    if(item.prod==action.payload.prod){
                        index=i;
                    }
                })
                if(index>=0){
                    state.pedido.productos[index].cantidad+=action.payload.cantidad;
                    state.pedido.productos[index].total+=action.payload.total;
                    state.pedido.valortot+=action.payload.total;
                }else{
                    state.pedido.productos.push(action.payload);
                    state.pedido.valortot+=action.payload.total
                }
            }else{
                state.pedido.productos.push(action.payload);
                state.pedido.valortot+=action.payload.total
            }
            
        },
        limpiacarrito:(state,action)=>{
            if(action.payload.prod!=""){
                let index=-1;
                state.pedido.productos.map((item,i)=>{
                    if(item.prod==action.payload.prod){
                        index=i;
                    }
                })
                if(index>=0){
                    state.pedido.valortot-=state.pedido.productos[index].total;
                    state.pedido.productos.splice(index,1);
                }

            }else{
                state.pedido.productos=[];
                state.pedido.valortot=0;
            }
        }
    }
});

export const { estadocarrito, limpiacarrito}=Slicersreducers.actions;
export default Slicersreducers.reducer;