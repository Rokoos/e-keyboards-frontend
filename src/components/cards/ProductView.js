import React, { Fragment,useState, useEffect } from 'react'
import {Card,  Tooltip} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItem from './ProductListItem'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import { showAverage} from '../../functions/rating'
import { addToWishlist} from '../../functions/user'
import { addToCart, showSideDrawer} from '../../actions'
import { checkCart} from '../../utils'
import { toast } from 'react-toastify'


const ProductView = ({product, onStarClick, star}) => {
    const {title,images, quantity,_id} = product

    const dispatch = useDispatch()
    const {user, cart} = useSelector(state => ({...state}))
    
  
      useEffect(() => {
        setTooltip(checkCart(cart, product))
      }, [cart, product])
  
      const [tooltip, setTooltip] = useState(checkCart(cart, product))
 
    const handleAddToWishlist = e => {
        addToWishlist(product._id, user.token)
        .then(res => {
            toast.success('Product added to wishlist')
        })
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product))
        dispatch(showSideDrawer(true))
      }
    
  return (
    <Fragment>
        <div className="col-md-7">
            <Carousel
            showArrows={false}
            renderIndicator={false}
            autoPlay
            infiniteLoop
            >
               {images && images.map(image => <img src={image.url} alt={title} key={image.public_id} />)} 
            </Carousel>
        </div>

        <div className="col-md-5">
            <h3 className="text-center mt-4">{title}</h3>
            {product && product.ratings && product.ratings.length > 0 ? showAverage(product)
                : <div className="text-center pb-2 h6">No ratings yet</div> }
            <Card

            actions={[
                <Tooltip title={tooltip}>
                    <p onClick={handleAddToCart} disabled={quantity < 1}>
                    <ShoppingCartOutlined
                    className="text-danger"
                    /><br/> Add to cart
                    </p>
                </Tooltip>,
                <span onClick={handleAddToWishlist}>
                    <HeartOutlined className="text-info"/> <br/> Add to Wishlist
                </span>,
                <RatingModal>
                    <StarRating
                    starDimension="30px"
                    name={_id}
                    numberOfStars={5}
                    rating={star}
                    changeRating={onStarClick}
                    isSelectable={true}
                    starRatedColor="orange"
                    starHoverColor="orange"
                    />
                </RatingModal>
            ]}
            >  
            <ProductListItem product={product}/>
            </Card>
        </div>
    </Fragment>
  )
}

export default ProductView
