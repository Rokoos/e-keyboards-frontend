import React, {useState, useEffect, useCallback, Fragment} from 'react'
import UserNav from './UserNav'
import ShowPaymentInfo from '../../components/ShowPaymentInfo'
import Invoice from '../../components/Invoice'
import { useSelector } from 'react-redux'
import { getUserOrders} from '../../functions/user'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import { PDFDownloadLink } from '@react-pdf/renderer';
import Spinner from '../../components/Spinner'
import { getUserName} from '../../utils'

const History = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.user)

 

  const fetchOrders = useCallback(() =>{
    setLoading(true)
    getUserOrders(user.token)
    .then(res => {
      setOrders(res.data)
      setLoading(false)
    } 
    )
  }, [user.token]) 

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const showOrder = order => (
        order.products.map((p, i) => (
          <div key={i}>
            <h6><strong className="mr-2">Brand:</strong>{p.product.brand}</h6>
            <h6><strong className="mr-2">Title:</strong>{p.product.title}</h6>
            <h6><strong className="mr-2">Price:</strong>€{p.product.price}</h6>
            <h6><strong className="mr-2">Count:</strong>{p.count}</h6>
            <h6><strong className="mr-2">Shipping:</strong>{p.product.shipping === "Yes"? <CheckCircleOutlined style={{color:'green'}}/> : <CloseCircleOutlined style={{color:'gray'}} />}</h6>
          </div>
        ))
  )

  const showDownloadLink =(order) => (
    <PDFDownloadLink document={
     <Invoice order={order}/>
    }
    fileName="invoice.pdf"
    className="btn btn-sm btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  )

  const showOrders = () => (
    <Fragment>
    {
      orders.length === 0 ? (
        <h4>No purchase orders</h4>
      ) : (
        orders.map((order,i) => (
          <div className="m-5 pt-3 pb-3 card" key={i}>
            {showOrder(order)}
            <ShowPaymentInfo order={order} /> 
            <div className="row">
              <div className="col">
                {showDownloadLink(order)}
              </div>
            </div>
          </div>
        ))
      )
    }
    </Fragment>
  ) 

  return (
    <div className="container checkout_margin">
            
            <div className="user_menu">
              <UserNav />
              <div className="text-center"
              style={{width:'100%'}}
              >
              
              {loading ? <Spinner/> : (
                <Fragment>
                <h4 className="mt-3">{user && getUserName(user)} purchase history</h4>
                {showOrders()}
                </Fragment>
              )}
            </div>

            </div>
        </div>
  )
}

export default History


