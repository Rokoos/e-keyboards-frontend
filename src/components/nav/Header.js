import React, {useState, useEffect, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import { 
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { getTotalCount, checkLoc} from '../../utils'
import { useDispatch, useSelector, } from 'react-redux'
import firebase from 'firebase/app'
import { userLogout} from '../../actions'


const { Item } = Menu;

const Header = ({history}) => {
  let loc = history.location.pathname
  let dispatch = useDispatch()
  const [current, setCurrent] = useState(loc)
  const {user, cart} = useSelector((state) => ({...state}));


useEffect(() => {
  setCurrent(loc)
}, [loc])
  const handleClick = (e) => {
    setCurrent(e.key)
  }  

  const logout = () => {
    firebase.auth().signOut()
    dispatch(userLogout())
    history.push('/')
  }

  const renderOptions = () => {

    if(!user){
      return(
        <Fragment>
          <Item
          onClick={() => history.push('/register')}
          key="/register" icon={<UserAddOutlined />} className="float-right" >
          <span className="gustaw">Register</span>
          </Item>
    
          <Item onClick={() => history.push('/login')} key="/login" icon={<UserOutlined />} className="float-right">
          <span className="gustaw">Login</span>
          </Item>
          
        </Fragment>
      )
    }else{
      let role = user.role === 'admin' ? '/admin/dashboard' : "/user/history"

      
      return (
        <Fragment>
        <Item  icon={<LogoutOutlined/>} className="float-right gustaw" onClick={logout}>
        <span className="gustaw">Logout
        </span>
          </Item>

          <Item
          onClick={() => history.push(role)}
           key={checkLoc(loc)} icon={<UserOutlined />} className="float-right">
          <span className="gustaw">
          {user.email && user.email.split('@')[0]}
          </span>
          </Item>
        </Fragment>
      )
    }

    
}

const cartMargin = getTotalCount(cart) > 0 ? "cart_count" : "hide-cart-count"
const cartNum = getTotalCount(cart)

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} style={{position:'fixed', zIndex:'1000', top:'0', width:'100%'}} mode="horizontal">
        <Item onClick={() => history.push('/')} key="/" icon={<HomeOutlined />} >
          <span className="gustaw"> <Link to="/"> Home</Link></span>
        </Item>

        <Item onClick={() => history.push('/shop')} key="/shop" icon={<ShoppingOutlined />} >
        <span className="gustaw">Shop</span>
        </Item>

        <Item onClick={() => history.push('/cart')} key="/cart" icon={<ShoppingCartOutlined  />} >
            <div className={cartMargin}>{cartNum}</div>
              <span className="gustaw">  
                Cart
              </span>
        </Item>
        {renderOptions()}     
    </Menu>
  )
}

export default withRouter(Header)