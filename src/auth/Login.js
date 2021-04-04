import React, {Fragment, useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import {auth, googleAuthProvider} from '../firebase'
import {toast} from 'react-toastify'
import { Button} from 'antd'
import { 
  MailOutlined,
  GoogleOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector} from 'react-redux'  
import { createOrUpdateUser} from '../functions/auth'
import { roleBasedRedirect} from '../utils'
import { loggedIn} from '../actions'
import Spinner from '../components/Spinner'


const Login = ({history}) => {

  let dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.user)

  useEffect(() => {
    let intended = history.location.state
    if(intended) {
      return
    }else{
      if(user && user.token)  history.push('/')
    }
  }, [user, history])



  const handleGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider)
      const {user} = result
      const idTokenResult = await user.getIdTokenResult()

      createOrUpdateUser(idTokenResult.token)
      .then(res => {
        dispatch(loggedIn(res.data.name, res.data.email,  idTokenResult.token,res.data.role, res.data._id ))
        roleBasedRedirect(res, history)
      })
      .catch(err => console.log(err))
    } catch (error) {
      toast.error(error.message)
    }
    
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const {user} = result
      const idTokenResult = await user.getIdTokenResult()

      createOrUpdateUser(idTokenResult.token)
      .then(res => {
        dispatch(loggedIn(res.data.name, res.data.email,  idTokenResult.token,res.data.role, res.data._id ))
        roleBasedRedirect(res, history)
      })
      .catch(err => console.log(err))
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  const loginForm = () => (
    <form>
      <div className="form-group">
        <input 
        type="email" 
        placeholder="Enter Your Email"
        className="form-control mb-3" 
        value={email} onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      </div>
      <div className="form-group">
        <input 
          type="password" 
          placeholder="Enter Password"
          className="form-control mb-3" 
          value={password} onChange={e => setPassword(e.target.value)}
        />
      </div>
  
      <Button
      type="primary"
      shape="round"
      block
      icon={<MailOutlined />}
      onClick={handleSubmit}
      className="mb-3"
      size="large"
      disabled={!email || password.length < 6}
      >Login with Email/Password</Button>

      <Button
      type="danger"
      shape="round"
      block
      icon={<GoogleOutlined />}
      onClick={handleGoogle}
      className="mb-3"
      size="large"
      >Login with Google</Button>
      <Link to="/forgot/password"
      className="float-right text-danger"
      >
      Forgot password</Link>
    </form>
  )

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          {loading ? <Spinner/> :(
            <Fragment>
            <h4 style={{textAlign:'center'}}>Login</h4>
            {loginForm()}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
