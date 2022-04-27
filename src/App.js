import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import {ProductList} from "./component/ProductList";
import {Summary} from "./component/Summary";
import axios from "axios";

function App() {
    const [products, setProducts] = useState([
        {id: 'uuid-1', productName: '코스타리카 따라주', category: '커피콩', price: 2000},
        {id: 'uuid-2', productName: '브라질 산토스', category: '커피콩', price: 4000},
        {id: 'uuid-3', productName: '인도네시아 만델링', category: '커피콩', price: 5000},
    ]);

    const [items, setItems] = useState([]);

    const handleAddClicked = (id) => {
        const product = products.find(v => v.id === id);
        const found = items.find(v => v.id === id);
        const updateItems =
            found ?
                items.map(v => (v.id === id) ? {...v,count: v.count + 1} : v)
                : [...items, {...product, count: 1}]
        setItems(updateItems);
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/products').then(v=> setProducts(v.data))
    }, [])

    return (
        <div className="container-fluid">
            <div className="row justify-content-center m-4">
                <h1 className="text-center">Grids & Circle</h1>
            </div>
            <div className="card">
                <div className="row">
                    <div className="col-md-8 mt-4 d-flex flex-column align-items-start p-3 pt-0">
                        <ProductList products={products} onAddClick={handleAddClicked}/>
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
