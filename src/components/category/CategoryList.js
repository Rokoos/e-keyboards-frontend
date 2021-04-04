import React, { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getCategories } from '../../functions/category'
import { LoadingOutlined} from '@ant-design/icons'

const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCategories()
    .then(res => {
        setCategories(res.data)
        setLoading(false)
    })
  }, [])  

const showCategories = () => ( 
        categories.map(cat => (
          <div 
          className="col btn btn-outlined-primary btn-block btn-lg btn-raised m-3"
          style={{color:'#1890ff'}}
          key={cat._id}> 
            <Link to={`/category/${cat.slug}`}>
            {cat.name}
            </Link>
          </div>))
    
)
  return (
    <div className="container">
      <div className="row">
         {loading ? 
              <LoadingOutlined className="h3 text-primary" />
            : 
            showCategories() }
      </div>
      <br/>
      <br/>
    </div>
  )
}

export default CategoryList