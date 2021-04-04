import React, {Fragment, useState, useEffect, useCallback} from 'react'
import { getProducts} from '../../functions/product'
import { useHistory } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import Spinner from '../Spinner'

const BestSellers = () => {

  let history = useHistory()

  const [productsPhotos, setProductsPhotos] = useState([])
  const [ loading, setLoading] = useState(false)

  const getProductsPhotos = products => {
    let photos = []
    products.map(p => photos.push({
        _id:p._id,
        brand: p.brand,
        title: p.title,
        image: p.images[0].url,
        slug: p.slug
      })
    )
    setProductsPhotos(photos)
  }

  const loadAllProducts = useCallback(() => {
    setLoading(true)
    //sort. order, limit
    getProducts('sold', 'desc', 1)
    .then(res => {
      getProductsPhotos(res.data)
      setLoading(false)
    })
  }, []) 

  useEffect(() => {
    loadAllProducts()
  }, [loadAllProducts])

  return (
    <Fragment>
      <h4 className="text-center p-5 mt-5 display-4 border-top  border-bottom">
        Best Sellers
      </h4>
      {
        loading ? <Spinner/> : (
          <div className="container-fluid mt-5  mb-3">
          <Carousel  
          style={{height:'400px'}}
          controls={false}
          indicators={false}
          className="col-md-10 col-lg-6 col-sm-12 mx-auto" >
            {productsPhotos.length === 0 ? <h4>Loading...</h4> : (
              productsPhotos.map(p =>  (
            <Carousel.Item 
            onClick={() => history.push(`/product/${p.slug}`)}
            className="text-center"
            style={{width:'100%' ,cursor:'pointer'}}
            key={p._id}>
            <h3 className="text-center mb-4" >{`${p.brand} ${p.title}`}</h3>
            <img
              className="img-fluid slider-image"
              src={p.image}
              alt="First slide"
            />
            </Carousel.Item>
          )
            ))}
          </Carousel>
        </div>
        )
      }
     
    </Fragment>
  )
}

export default BestSellers


