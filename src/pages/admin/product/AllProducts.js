import React, {useState, useEffect} from 'react'
import AdminNav from '../AdminNav'
import {useSelector } from 'react-redux'
import {getProductsByCount, removeProduct} from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import {toast} from 'react-toastify'


const AllProducts = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const user = useSelector((state) => state.user);

const fetchProducts = () => {
  setLoading(true)
  getProductsByCount(20)
    .then(res => {
      setLoading(false)
      setProducts(res.data)
    })
    .catch(err=> {
      console.log(err)
      setLoading(false)
    })
}

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleRemove = slug => {
    let answer = window.confirm('Do You really want to delete?')
    if(answer){
      removeProduct(slug, user.token)
      .then(res => {
        fetchProducts()
        toast.error(`${res.data.title} is deleted.`)
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 400) toast.error(err.response.data)
      })
    }
  }
  return (
    <div className="container-fluid mt-5">
        <div className="row"> 
            <div className="col-md-2">
              <AdminNav/>
            </div>
            
            <div className="col">
              {loading ? <h4>Loading...</h4> : <h4>All products</h4>}
              <div className="row">
              {products.map(product => (
                <div className="col-md-4" key={product._id}>
                <AdminProductCard
                handleRemove={handleRemove}
                product={product}/>
                </div>
              ))}
              </div>
            </div>
        </div>
    </div>
  )
}

export default AllProducts
