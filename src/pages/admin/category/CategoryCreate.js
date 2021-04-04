import React, {useState, useEffect, Fragment} from 'react'
import { Link} from 'react-router-dom'
import AdminNav from '../AdminNav'
import {toast} from 'react-toastify'
import { useSelector} from 'react-redux'
import {createCategory, getCategories, removeCategory } from '../../../functions/category'
import Spinner from '../../../components/Spinner'
import { EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm  from '../../../components/CategoryForm'
import Search from '../../../components/Search'

const CategoryCreate = () => {

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState('')

    const user = useSelector(state => state.user)

    const fetchCategories =  () => getCategories().then(res => {
        setCategories(res.data)
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)

        createCategory({name}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created!`)
            fetchCategories()
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.status === 400) toast.error(err.response.data)
        })
    }

   
    const handleRemove = async slug => {
        if(window.confirm('Delete?')){
            setLoading(true)
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false)
                toast.error(`${res.data.name} deleted!`)
                fetchCategories()
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
        }
        
    }

    const searched = keyword => (c) => c.name.toLowerCase().includes(keyword)
    
  return (
    <div className="container-fluid mt-5">
        <div className="row"> 
            <div className="col-md-2">
              <AdminNav/>
            </div>
            <div className="col">
                {loading ? <Spinner/> : 
                (
                <Fragment>
                <h4>Create category</h4>
                <CategoryForm 
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                title="Save"
                />
                <Search
                keyword={keyword}
                setKeyword={setKeyword}
                />
                {categories.filter(searched(keyword)).map(c => (
                    <div className="alert alert-primary" key={c._id}>
                    {c.name} 
                    <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger"/></span>
                    <Link to={`/admin/category/${c.slug}`}>
                    <span className="btn btn-sm float-right"><EditOutlined /></span>
                    </Link>
                    </div>
                ))}
                </Fragment>)}
            </div>
        </div>
    </div>
  )
}

export default CategoryCreate