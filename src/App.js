import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import {ProductList} from "./component/ProductList";
import {Summary} from "./component/Summary";
import axios from "axios";

function App() {
    const [products, setProducts] = useState([
        {productId: 'uuid-1', productName: '코스타리카 따라주', category: '커피콩', price: 2000},
        {productId: 'uuid-2', productName: '브라질 산토스', category: '커피콩', price: 4000},
        {productId: 'uuid-3', productName: '인도네시아 만델링', category: '커피콩', price: 5000},
    ]);

    const [items, setItems] = useState([]);

    const handleAddClicked = (productId) => {
        const product = products.find(v => v.productId === productId);
        const found = items.find(v => v.productId === productId);
        const updateItems =
            found ?
                items.map(v => (v.productId === productId) ? {...v, count: v.count + 1} : v)
                : [...items, {...product, count: 1}]
        setItems(updateItems);
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/products').then(v => setProducts(v.data))
    }, [])

    const handleOrderSubmit = (order) => {
        if (items.length === 0) {
            alert("아이템을 추가해주세요.");
        } else {
            axios.post('http://localhost:8080/api/v1/orders', {
                email: order.email,
                address: order.address,
                postcode: order.postcode,
                orderItems: items.map(v => ({
                    productId: v.productId,
                    category: v.category,
                    price: v.price,
                    quantity: v.count
                }))
            }).then(
                v => alert("주문이 정상적으로 접수되었습니다."),
                e => {
                    alert("서버 장애");
                    console.log(e)
                });
        }
    }

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
                        <Summary items={items} onOrderSubmit={handleOrderSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
