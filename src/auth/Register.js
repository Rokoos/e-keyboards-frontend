import React, {useState, useEffect} from 'react'
import {auth} from '../firebase'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'


const Register = ({history}) => {

  const [email, setEmail] = useState('')


  const user = useSelector(state => state.user)

    useEffect(() => {
        if(user && user.token)  history.push('/')

    }, [user, history])

  const handleSubmit = async e => {
    e.preventDefault()
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    }

    await auth.sendSignInLinkToEmail(email, config)
    toast.success(`Email is sent to ${email}. Click the link to complete your registration.`)

    window.localStorage.setItem('emailForRegistration', email)
    setEmail('')
  }

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Enter Your Email"
        className="form-control mb-3" 
      value={email} onChange={e => setEmail(e.target.value)}
      autoFocus
      />
      <button type="submit" className="btn btn-raised btn-success">
        Register
      </button>
    </form>
  )

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  )
}

export default Register
