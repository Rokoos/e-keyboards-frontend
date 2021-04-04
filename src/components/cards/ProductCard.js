import React, {Fragment, useEffect, useState} from 'react'
import { Link} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import { addToCart, showSideDrawer} from '../../actions'
import { toast} from 'react-toastify'
import { checkCart} from '../../utils'
import { showAverage } from '../../functions/rating'

const { Meta } = Card;


const ProductCard = ({product}) => {
    const {images, slug, title, price, brand, quantity} = product

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart )

    useEffect(() => {
      setTooltip(checkCart(cart, product))
    }, [cart, product])

    const [tooltip, setTooltip] = useState(checkCart(cart, product))


    const handleAddToCart = () => {

      let existingItem = cart.find(cartItem => cartItem._id === product._id)
      if(!existingItem){
        dispatch(addToCart(product))
        dispatch(showSideDrawer(true))
      }else{
        if( existingItem.count < existingItem.quantity ){
            dispatch(addToCart(product))
            dispatch(showSideDrawer(true))
          }else{
            toast.error(`There is only ${existingItem.quantity} ${existingItem.brand} ${existingItem.title} in stock`)
          }

          
      }
   
    }

    const showData = () => (
      <Fragment>
        { product.ratings.length > 0 && showAverage(product)}
        <h6 className="text-center">{`${brand} ${title}`}</h6>
        <h6>€ <span className="font-italic">{price}</span></h6>
      </Fragment>
    )

  return (
    <Card className="col m-3 d-flex flex-column justify-content-between"
    hoverable
        cover={<img 
        className="mx-auto"
        alt="example" src={images && images.length ? images[0].url : ''}/>}
        actions={[
            <Link to={`/product/${slug}`}>
              <EyeOutlined
              className="text-primary"
              />
              <br/>
              View Product
            </Link>, 
            <Tooltip title={tooltip}>
              <p onClick={handleAddToCart} disabled={quantity < 1}>
              <ShoppingCartOutlined
              className="text-danger"
              /><br/> {quantity < 1 ? 'Out of stock' : 'Add to cart'}
              </p>
            </Tooltip>
          ]}
    >
        <Meta title={showData()} />
    </Card>
  )
}

export default ProductCard




// <div class="card">
//     <img class="card-img-top" 
//     src={images && images.length ? images[0].url : ''}
//     alt="Card image cap"/>
//     <div class="card-body">
//       <h5 class="card-title">{title}</h5>
//       <p class="card-text">{description}</p>
//     </div>
//   </div>