import React, {useState, useEffect, Fragment} from 'react'
import AdminNav from '../AdminNav'
import {toast} from 'react-toastify'
import { useSelector} from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import CategoryForm from '../../../components/CategoryForm'
import Spinner from '../../../components/Spinner'


const UpdateCategory = ({history,match}) => {

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const user = useSelector(state => state.user)
    const slug = match.params.slug


    useEffect(() => {
        getCategory(slug).then(res => {
            setName(res.data.name)
        })
    }, [slug])

    const handleSubmit = e => {
        e.preventDefault()

        updateCategory(slug,{name}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`Update successfull!`)
            history.push('/admin/category')
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.status === 400) toast.error(err.response.data)
        })

    }
   
  return (
    <div className="container-fluid">
        <div className="row"> 
            <div className="col-md-2">
              <AdminNav/>
            </div>
            <div className="col">
                {loading ? <Spinner/> : (
                 <Fragment>  
                <h4>Update category</h4>
                <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                title="Update"
                />
                </Fragment> )
                }
            </div>
        </div>
    </div>
  )
}

export default UpdateCategory