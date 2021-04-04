import React from 'react'
import { Carousel } from 'react-responsive-carousel';

const Slider = ({product}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <Carousel
          showArrows={false}
          renderIndicator={false}
          autoPlay
          infiniteLoop
          >
            <img src={product.url} />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Slider
