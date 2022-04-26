import React from "react";
import {Product} from "./Product";

export function ProductList({products = [{}]}) {
    return (
        <React.Fragment>
            <h5 className="flex-grow-0"><b>상품 목록</b></h5>
            <ul className="list-group products">
                {products.map(item =>
                    <li key={item.id} className="list-group-item d-flex mt-3">
                        <Product productName={item.productName} category={item.category} price={item.price}/>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}
