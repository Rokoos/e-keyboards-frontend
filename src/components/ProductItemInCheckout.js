
import React, { Fragment } from 'react'
import ModalImage from 'react-modal-image'
import { Link} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { addToCart,subtractFromCart, removeFromCart} from '../actions'
import { 
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import { toast} from 'react-toastify'

const ProductItemInCheckout = ({product}) => {
    const {images, title, price, brand, shipping, count, slug, quantity} = product

    let dispatch = useDispatch()

    const addOneItem = () => {
        if(count < quantity){
            dispatch(addToCart(product))
        }else{
            toast.error(`There is only ${quantity} ${brand} ${title} in stock`)
        }
        
    }

    const handleRemove = e => {
        let cart
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            } 
            cart.forEach((p, i) => {
                if(p._id === product._id){
                    cart.splice(i, 1)
                }
            }) 
            
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch(removeFromCart(product))
        }
    }
  return (
    <Fragment>
    <div className="cart-item mt-5">   
        <div className="text-center">
            <div className="mr-3 ml-3 photo-size">
                    {images.length && 
                        <ModalImage 
                        small={images[0].url}
                        large={images[0].url}
                        /> }
            </div>
            <div className="text-center mt-2">
                <p>{brand}
                <Link className="ml-2" to={`/product/${slug}`}>
                    {title} 
                </Link> 
                </p>
                <p>€ <em>{price}</em></p>
            </div>  
        </div>      
         
        <div className="text-center ">
            <div className="header-medium">
                <div onClick={() => dispatch(subtractFromCart(product))} className="btn-black">
                    <span>-</span>
                    </div>
                    <span className="count">{count}</span>
                    <div onClick={addOneItem} className="btn-black">
                    <span>+</span>
                </div>
            </div>    
            <p className="cart-item2">Shipping? {shipping === "Yes" ? <CheckCircleOutlined className="text-success ml-2"/> : <CloseCircleOutlined className="text-danger ml-2"/>}</p>
            <p className="cart-item2">Remove <DeleteOutlined onClick={handleRemove} className="text-danger ml-2" style={{cursor:"pointer"}} /></p>
        </div>       
    </div>
    <hr/>
    </Fragment>
  )
}

export default ProductItemInCheckout
