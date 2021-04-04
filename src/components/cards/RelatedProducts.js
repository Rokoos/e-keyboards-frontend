import React, {Fragment} from 'react'
import LoadingCard from './LoadingCard'
import ProductCard from './ProductCard'

const RelatedProducts = ({products, loading}) => {
  return (
    <Fragment>
            <h4 className="text-center my-5 mb-5 display-4 p-5 border-top  border-bottom">
            Related Products
            </h4>

            <div className="container"
            >
            {loading ? (<LoadingCard count={3} />) 
            : (
              <div className="row">
              {products.map(p => (
                <div className="col-md-4 d-flex align-items-stretch" key={p._id}>
                   <ProductCard  product={p}/>
                </div>))}
              </div>
            )  }
            </div>
        </Fragment>
  )
}

export default RelatedProducts
