import React, {useEffect, useState, useCallback} from 'react'
import AdminNav from '../AdminNav'
import { useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { getProduct, updateProduct} from '../../../functions/product'
import { getCategories } from '../../../functions/category'
import ProductUpdateForm from '../../../components/ProductUpdateForm'
import FileUploader from '../../../components/FileUploader'
import { LoadingOutlined} from '@ant-design/icons'

const initState = {
  title: '',
  description: '',
  price: '',
  category:'',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  brands: ['Korg', "Yamaha", "Roland", "Ketron", "Casio"],
  brand: '',
  specs: ''
}

const ProductUpdate = ({match, history}) => {

  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initState)
  const [categories, setCategories] = useState([])
  const [arrayOfSubIds, setArrayOfSubIds] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
    const {slug} = match.params
    const user = useSelector(state => state.user)


    const fetchProduct = useCallback(() => {
      getProduct(slug)
          .then(p => setValues(values => ({ ...values, ...p.data })))
  }, [slug, setValues])

    const fetchCategories = useCallback(() => {
      getCategories()
      .then(res => {
        setCategories(res.data)
      })
    }, []) 

    useEffect(() => {
      fetchProduct()
      fetchCategories()
    }, [fetchProduct, fetchCategories])

    const handleSubmit =e => {
      e.preventDefault()
      setLoading(true)

      values.subs = arrayOfSubIds
      values.category = selectedCategory ? selectedCategory : values.category

      updateProduct(slug, values, user.token)
      .then(res => {
        setLoading(false)
        toast.success(`${res.data.title} has been updated!`)
        history.push('/admin/products')
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        toast.error(err.response.data.error)
      })
    }



    const handleChange = e => {
      setValues({...values, [e.target.name]: e.target.value})
    }



    const handleCategoryChange =  e => {
      e.preventDefault()
      setValues({...values, subs: []})
      setSelectedCategory(e.target.value)
      
      if(values.category._id === e.target.value){
        fetchProduct()
      }

      setArrayOfSubIds([])
  
    }
  return (
    <div className="container-fluid mt-5">
        <div className="row">
            <div className="col-md-2">
            <AdminNav/>
            </div>

            <div className="col-md-10">
              <div className="text-center">
                {loading ? <LoadingOutlined className="h3 text-primary"/> :<h4>Update Product</h4>}
              </div>

            <div className="p-3">
            <FileUploader
            values={values}
            setValues={setValues}
            setLoading={setLoading}
            />
          </div>

            <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            values={values}
            categories = {categories}
            selectedCategory={selectedCategory}
            />
            </div>
        </div>
    </div>
  )
}

export default ProductUpdate
