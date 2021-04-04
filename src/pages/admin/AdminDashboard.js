import React, {Fragment, useState, useEffect, useCallback} from 'react'
import AdminNav from './AdminNav'
import Orders from '../../components/Orders'
import {getProductsByCount} from '../../functions/product'
import { getOrders, changeStatus} from '../../functions/admin'
import { useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'

const AdminDashboard = () => {

  const user = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const[ orders, setOrders] = useState([])

const fetchProducts = () => {
  setLoading(true)
  getProductsByCount(10)
    .then(res => {
      setLoading(false)
    })
    .catch(err=> {
      console.log(err)
      setLoading(false)
    })
}

const loadOrders = useCallback( () => getOrders(user.token).then(res => setOrders(res.data)), [user.token]) 

  useEffect(() => {
    loadOrders()
    fetchProducts()
  }, [loadOrders])

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token)
    .then(res => {
      toast.success('Status updated')
      loadOrders()
    })
  }
  return (
    <div className="container-fluid mt-5">
        <div className="row"> 
            <div className="col-md-2">
              <AdminNav/>
            </div>
          <div className="col-md-10">
            {
              loading ? <Spinner/> : (
                <Fragment>
                  <h4 className="mt-3 mb-3">Admin dashboard</h4>
                  <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </Fragment>
              )
             }
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard
