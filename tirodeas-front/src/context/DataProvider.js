import React, { createContext, useState, useEffect } from "react";
//import Data2 from "Data2.js";
import $ from "jquery";
let Data;
//console.log(Data2);
$.ajax({    
	url : 'http://129.151.111.220:8080/api/productos/all',
//    data : { id : 1 },
	type : 'GET',
	dataType : 'json',

	success : function(respuesta) {
		console.log(respuesta);
        Data=respuesta;
	},
	error : function(xhr, status) {
		alert('ha sucedido un problema');
	},
	complete : function(xhr, status) {
		alert('Petición realizada');
	}
});

export const DataContext = createContext();

export const DataProvider = (props) => {
	const [productos, setProductos] = useState([]);
	const [menu, setMenu] = useState(false)
	const [carrito, setCarrito] =useState([])
	const [total, setTotal] = useState(0)

	console.log(carrito)

  useEffect(() => {
		//const producto = Data.items 
		const producto = Data;
		console.log(producto);
		if(producto){
			setProductos(producto)
		}else{
			setProductos([])
		}
	}, []);

	const addCarrito = (id) =>{
		const check = carrito.every(item =>{
			return item.id !== id
			
		})
		if(check){
			const data = productos.filter(producto =>{
				return producto.id === id
			})
			setCarrito([...carrito, ...data])
		}else{
			alert("El producto se ha añadido al carrito")
		}
	}
	useEffect(() =>{
		const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'))
		if(dataCarrito){
			setCarrito(dataCarrito)
		}
	},[])

	useEffect(() =>{
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	},[carrito])

	useEffect(() =>{
		const getTotal = () =>{
			const res = carrito.reduce((prev, item) =>{
				return prev + (item.price * item.cantidad)
			},0)
			setTotal(res)
		}
		getTotal()
	},[carrito])
	
	const value = {
		productos : [productos],
		menu: [menu, setMenu],
		carrito: [carrito, setCarrito],
		addCarrito: addCarrito,
		total: [total, setTotal]
	}
	return (
		<DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
	)
};
