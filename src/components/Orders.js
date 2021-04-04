import React, {Fragment} from 'react'
import ShowPaymentInfo from './ShowPaymentInfo'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'

const statusTypes = [
    'Not Processed',
    'Processing',
    "Dispatched",
    "Cancelled",
    "Completed"
]

const Orders = ({orders, handleStatusChange}) => {
    const showOrderInTable = order => (
        <table className="table table-bordered">
          <thead  className="thead-light text-center">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Count</th>
              <th scope="col">Shipping</th>
            </tr>
          </thead>
    
          <tbody className="thead-light text-center">
            {order.products.map((p, i) => (
              <tr key={i}>
                <td><b>{p.product.title}</b></td>
                <td>€{p.product.price}</td>
                <td>{p.product.brand}</td>
                <td>{p.count}</td>
                <td>{p.product.shipping === "Yes"? <CheckCircleOutlined style={{color:'green'}}/> : <CloseCircleOutlined style={{color:'gray'}} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    return(
    <Fragment>
    {
        orders.map(order => (
            <div className="mt-5"  key={order._id}>
            <ShowPaymentInfo order={order} showStatus={false} />
                <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="mr-5" >Delivery Status:</div>
                    <div >
                        <select
                        className="form-control"
                        defaultValue={order.orderStatus}
                        name="status"
                        onChange={e =>handleStatusChange(order._id, e.target.value)}>
                            {statusTypes.map((t, i) => (
                                <option  key={i} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {showOrderInTable(order)}
                <hr/>
            </div>
        ))
    }
    </Fragment>
)
}

export default Orders
