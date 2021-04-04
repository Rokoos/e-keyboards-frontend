import React from 'react'
import StarRating from 'react-star-ratings'

export const showAverage = (product) => {
    let averageRating
    let length
    if(product && product.ratings){
        let ratingsArray = product && product.ratings
        let total = []
        length = ratingsArray.length
        ratingsArray.map(rating => total.push(rating.star))

        let totalReduced = total.reduce((prev, next) => prev + next, 0)
        averageRating = totalReduced/length
    }
  return (
    <div className="text-center pb-2">
      <span>
        <StarRating 
        starDimension="20px"
        starSpacing="2px"
        starRatedColor="orange"
        rating={averageRating}
        editing={false}
        />{" "}({length})
      </span>
    </div>
  )
}


