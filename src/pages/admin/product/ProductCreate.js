import React, {useState, useEffect, useCallback} from 'react'
import AdminNav from '../AdminNav'
import ProductCreateForm from '../../../components/ProductCreateForm'
import {toast} from 'react-toastify'
import { useSelector} from 'react-redux'
import {createProduct} from '../../../functions/product'
import { getCategories } from '../../../functions/category'
import FileUploader from '../../../components/FileUploader'
import { LoadingOutlined} from '@ant-design/icons'
import {initState} from '../../../utils'


const ProductCreate = () => {

  const user = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initState)
  
  
  
  const fetchCategories = useCallback(() => {
    getCategories()
        .then(p => setValues(values => ({ ...values, categories: p.data })))
}, [ setValues])

useEffect(() => {
    fetchCategories()
}, [ fetchCategories])


  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleCategoryChange =  e => {
    e.preventDefault()
    setValues({...values, category: e.target.value})
  }
  
  const handleSubmit = async e => {
    e.preventDefault()
    createProduct(values, user.token)
    .then(res => {
      toast.success(`"${res.data.title}" is created!`)
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
     toast.error(err.response.data.error)
    })
  }
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col-md-10">
        <div className="text-center">
        {loading ? <LoadingOutlined 
          className="h3 text-primary"
          /> :<h4>Create Product</h4>}
        </div>
          <div className="p-3">
            <FileUploader
            values={values}
            setValues={setValues}
            setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCategoryChange={handleCategoryChange}
          values={values}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
