import React, { Fragment } from 'react'
import { MDBView, MDBMask } from 'mdbreact';
import MainTheme from "../../images/puk-khantho-sWbGwr1fOUk-unsplash.jpg"
import { Link } from 'react-router-dom';
import shopping from '../../images/order-now-go-shopping-shop-online-now-button.png'

const View = () => {
    return (
      <Fragment>
        <MDBView src={MainTheme}  className="d-flex flex-row  justify-content-end align-items-end">  
          <MDBMask>
            <p className="text-white mr-5 view-text">Get a keyborad and play!</p>
          </MDBMask>
          </MDBView>

          <Link to='/shop'>
          <div className="text-center bounce_icon">
            <img className="bounce_icon-image" src={shopping} alt="shopping icon"/>
          </div>
          </Link>
        </Fragment>
    )
  }

export default View