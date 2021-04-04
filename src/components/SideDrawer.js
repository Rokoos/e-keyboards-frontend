import React from 'react'
import { Drawer, Button } from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import { Link} from 'react-router-dom'
import { showSideDrawer } from '../actions'
import { getTotalCount} from '../utils'
import ModalImage from 'react-modal-image'



const SideDrawer = () => {
    const dispatch = useDispatch()
    const {drawer, cart} = useSelector(state => ({...state}))

    let cartLength = getTotalCount(cart)
    let product = cartLength === 1 ? 'product' : 'products'
  return (
      <Drawer
      style={{zIndex:'10000'}}
      className="text-center"
      title={`${cartLength} ${product} in the cart.`}
      closable={false}
      onClose={() => dispatch(showSideDrawer(false))}
      visible={drawer} >
        {cart.map(p => (
            <div className="row" key={p._id}>
                <div className="col">
                   <div className="mb-4">
                    <ModalImage small={p.images[0].url} large={p.images[0].url} />
                    <p>{`${p.count} x ${p.brand} ${p.title}`}</p>
                   </div>
                </div>
            </div>
        ))}
        <Link
         to="/cart" >
            <Button className="text-center btn btn-raised btn-success btn-block"
            onClick={() => dispatch(showSideDrawer(false))}
            >
                Go to cart
            </Button>
        </Link>
      </Drawer>
  )
}

export default SideDrawer


