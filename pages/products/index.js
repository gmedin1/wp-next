import axios from 'axios'
import addOAuthInterceptor from "axios-oauth-1.0a";

const Products = ({ products }) => {
    console.log(products)
    return(
        <div>
            { products.length ? products.map((product) => <div key={ product.id }>{ product.name }</div>) : 'No products available' }
        </div>
    )
}

export default Products;

export async function getStaticProps() {
    // TODO: Make Services Folder With All Axios Calls and Config.

    /**
     *
     * Create a new Axios Instance to allow Oauth 1.0 Signatures.
     */
    const instance = axios.create()
    const options  = {
        algorithm: 'HMAC-SHA1',
        secret:    'cs_6047e06d197f22ea5df658972995c2357acd7b6d',
        key:       'ck_17a01c364d3b7f6c48c47e0cb732ba935db1eaf8',
    }

    /**
     *
     * Add an Interceptor to Our Newly Created Instance.
     * The Interceptor Will Handle ( like a Middleware ) All Oauth Requests.
     */
    addOAuthInterceptor(instance, options)

    /**
     *
     * Get All Products From WooCommerce Endpoint.
     */
    const url      = 'http://next.local/wp-json/wc/v3/products'
    const products = await instance
        .get(url)
        .then(response => response.data)
        .catch(error => console.log(error))

    /**
     *
     * Return the Products List as a Prop of Our Page Component.
     */
    return {
        props: {
            products
        }
    }
}