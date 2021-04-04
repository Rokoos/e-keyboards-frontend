import React, { useEffect, useState, useCallback} from 'react'
import { getProduct, productStar, getRelated, updateAverageProductRating} from '../functions/product'
import ProductView from '../components/cards/ProductView'
import {useSelector} from 'react-redux'
import RelatedProducts from '../components/cards/RelatedProducts'

const SingleProduct = ({match}) => {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [related, setRelated] = useState([])
    const [star, setStar] = useState(0)

    const user = useSelector(state => state.user)

    const slug = match.params.slug

    const fetchSingleProduct = useCallback(() => {
        setLoading(true)
        getProduct(slug)
        .then(res => {
            setProduct(res.data)
            setLoading(false)
            getRelated(res.data._id)
            .then(response => setRelated(response.data))
        })
    }, [slug]) 

    useEffect(() => {
        fetchSingleProduct()
    }, [slug, fetchSingleProduct])
    
    useEffect(() => {
        if(product.ratings && user){
            let existingRatingObject = product.ratings.find(el => el.postedBy.toString() === user._id.toString())
            existingRatingObject && setStar(existingRatingObject.star)
        }
    },[product.ratings, user ])

    const onStarClick = (newRating, name) => {
        setStar(newRating)
        productStar(name, newRating, user.token)
        .then(res => {
            fetchSingleProduct()
            updateAverageProductRating(name, user.token)
        })
        
    }

   
  return (
    <div className="container-fluid mt-5"
    >
    <div className="container">
    <div className="row pt-4">
             <ProductView product={product} onStarClick={onStarClick} star={star} />
        </div>
    </div>
        
        {related.length === 0 ? <h4 className="text-center my-5 mb-5 display-4 border-top  border-bottom p-5">No related products </h4> : (
            <RelatedProducts
            products={related}
            loading={loading}
            />
        )}

        
        <div className="losFooteros"></div>
    </div>
  )
}

export default SingleProduct
