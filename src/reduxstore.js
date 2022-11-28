import { configureStore } from "@reduxjs/toolkit";
import carrito from "./Slicersreducers.js";

const reduxstore=configureStore({
    reducer:{
        carrito
    }
});

export default reduxstore;