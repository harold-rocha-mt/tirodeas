import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { DataContext } from "context/DataProvider";

//export const ProductoItem = ({title, image, category, price, id}) => {
  export const ProductoItem = ({nombre, imagen, categoria, precio, id}) => {

  const value = useContext(DataContext);
  const addCarrito = value.addCarrito;



  return (
    
    <div key={id} className="producto">
      <Link to={`/producto/${id}`}>
      <div className="producto__img">
        <img src={imagen} alt={nombre} />
      </div>
      </Link>
      <div className="producto__footer">
        <h1>{nombre}</h1>
        <p>{categoria}</p>
        <p className="precio">${precio} </p>
      </div>
      <div className="bottom">
        <button onClick={() => addCarrito(id)} className="btn">Añadir al carrito</button>
        <div>
        <Link to={`/producto/${id}`} className="btn">Vista</Link>
        </div>
      </div>
    </div>
  );
};
