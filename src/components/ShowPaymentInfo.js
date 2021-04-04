import React from 'react'

const ShowPaymentInfo = ({order, showStatus = true}) => (
    <div>
        <p className="p-1">
            <span><strong>Order Id:</strong> {order.paymentIntent.id}</span><br/>
            <span><strong>Amount:</strong> {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
                style:"currency",
                currency: 'EUR'
            })}</span><br/>
            <span><strong>Currency:</strong> {order.paymentIntent.currency.toUpperCase()}</span><br/>
            <span><strong>Method:</strong> {order.paymentIntent.payment_method_types[0]}</span><br/>
            <span><strong>Payment:</strong> {order.paymentIntent.status.toUpperCase()}</span><br/>
            <span><strong>Ordered on:</strong> {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span><br/>
            {showStatus && (
                <span className="badge bg-primary text-white">STATUS: {order.orderStatus}</span>
            )}
        </p>
    </div>
)

export default ShowPaymentInfo
