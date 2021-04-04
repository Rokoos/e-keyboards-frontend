import React, {useState, useEffect, Fragment, useCallback} from 'react'
import UserNav from './UserNav'
import ModalImage from 'react-modal-image'
import { getWishlist, removeFromWishlist} from '../../functions/user'
import { useSelector} from 'react-redux'
import { Link} from 'react-router-dom'
import {DeleteOutlined } from '@ant-design/icons'
import Spinner from '../../components/Spinner'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  const {user} = useSelector(state => ({...state}))

  const loadWishlist = useCallback(() => {
    setLoading(true)
    getWishlist(user.token)
    .then(res => {
      setWishlist(res.data.wishlist)
      setLoading(false)
    })
  }, [user.token])

  useEffect(() => {
    loadWishlist()
  }, [loadWishlist])

  const handleRemove = (productId) => {
    removeFromWishlist(productId, user.token)
    .then(res => {
      loadWishlist()
    })
  }

  const renderWishlist = () => (
    <Fragment>
      {wishlist.length === 0 ? (
        <h6>Your Wishlist is empty</h6>
      ) : (
        wishlist.map(p => (
          <div key={p._id} className="card user_wishlist">
            <div style={{width:'150px', height:'auto'}}>
                <ModalImage 
                  small={p.images[0].url}
                  large={p.images[0].url}
                  /> 
            </div>
            
              <Link to={`/product/${p.slug}`} >{`${p.brand} ${p.title}`}</Link>
              <span
              onClick={() => handleRemove(p._id)} 
              className="btn btn-sm float-right">
                <DeleteOutlined className="text-danger" />
              </span>
            
          </div>
        ))
      ) }
    </Fragment>
  )

  return (
    <div className="container checkout_margin">
        <div className="user_menu"> 
              <UserNav/>
            <div className="col mt-3">
              <h4 className="mb-3 ">Wishlist</h4>
              {loading ? <Spinner/> :renderWishlist()}
            </div>
        </div>
        </div>
  )
}

export default Wishlist
