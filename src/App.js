import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from "react";
import {ProductList} from "./component/ProductList";
import {Summary} from "./component/Summary";

function App() {
    const [products, setProducts] = useState([
        {id: 'uuid-1', productName: '코스타리카 따라주', category: '커피콩', price: 2000},
        {id: 'uuid-2', productName: '브라질 산토스', category: '커피콩', price: 4000},
        {id: 'uuid-3', productName: '인도네시아 만델링', category: '커피콩', price: 5000},
    ]);
    const [items, setItems] = useState([]);
    return (
        <div className="container-fluid">
            <div className="row justify-content-center m-4">
                <h1 className="text-center">Grids & Circle</h1>
            </div>
            <div className="card">
                <div className="row">
                    <div className="col-md-8 mt-4 d-flex flex-column align-items-start p-3 pt-0">
                        <ProductList products={products}/>
                    </div>
                    <div className="col-md-4 summary p-4">
                        <Summary items={items}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
