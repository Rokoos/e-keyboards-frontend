import React from 'react'
import {Link} from 'react-router-dom'
import { ArrowRightOutlined  } from '@ant-design/icons'

const ProductListItem = ({product}) => {

    const { category, price, sold, quantity, brand,shipping, specs} = product
  return (
    <ul className="list-group">
        <li className="list-group-item">
            Price{" "} <span className="label label-default label-pill pull-xs-right"> €{price}</span>
        </li>

        {category && (
            <li className="list-group-item">
            Category{" "} 
          <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">{category.name}            
           </Link>        
         </li>
        )}

        <li className="list-group-item">
            Brand{" "} <span className="label label-default label-pill pull-xs-right"> {brand}</span>
        </li>

        <li className="list-group-item">
        Quantity{" "} <span className="label label-default label-pill pull-xs-right"> {quantity}</span>
        </li>

        <li className="list-group-item">
            Shipping{" "} <span className="label label-default label-pill pull-xs-right"> {shipping}</span>
        </li>

        <li className="list-group-item">
            sold{" "} <span className="label label-default label-pill pull-xs-right"> {sold}</span>
        </li> 
        {
          specs && (
            <li className="list-group-item d-flex flex-row justify-content-center">
            <a href={specs} target="_blanc">   
                <button className="btn btn-raised btn-info">Specifications<ArrowRightOutlined className="ml-2"/></button>
            </a> 
        </li>
          )
        }
    </ul>
  )
}

export default ProductListItem


