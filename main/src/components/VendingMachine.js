import React, { Component } from 'react'
import Product from './Product'
import ProductStore from '../stores/ProductStore'

class VendingMachine extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            tokens: 0
        }

        this.addToken = () => {
            let no = this.state.tokens + 1;
            this.setState({
                tokens: no
            });
        }

        this.buyProduct = (price) => {
           if (this.state.tokens >= price) {
               alert('product bought');
               let tokensRemained = this.state.tokens - price;
               this.setState({
                   tokens: tokensRemained
               })
           } else {
               alert('insufficient tokens');
           }
        }

    }
    componentDidMount() {
        let productStore = new ProductStore();
        let prods = productStore.getAll();

        this.setState({
            products: Array.from(prods)
        })
        this.state.products.map((el, index) => console.log(index, el)); 
    }

    render() {
        return (
            <div>
                {this.state.products.map((el, index) => <Product key={index} id={el.id} name={el.name} price={el.price} onBuy={this.buyProduct}/>)}
                <div>Tokens: {this.state.tokens}</div>
                <input type="button" value="add token" onClick={this.addToken}/>
            </div>
        )
    }
}

export default VendingMachine