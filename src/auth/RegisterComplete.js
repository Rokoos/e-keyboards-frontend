import React, {useState, useEffect} from 'react'
import { useDispatch} from 'react-redux'
import {auth} from '../firebase'
import {toast} from 'react-toastify'
import {createOrUpdateUser} from '../functions/auth'
import {loggedIn} from '../actions'


const RegisterComplete = ({history}) => {

  let dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {

    if(localStorage.getItem('emailForRegistration')){
      setEmail(localStorage.getItem('emailForRegistration'))
    }
     
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    //validation
    if(!email || !password){
        toast.error('Email and password are required.')
        return
    }

    if(password.length < 6){
        toast.error('password must be at least 6 characters long.')
        return
    }

    try {
        const result = await auth.signInWithEmailLink(email, window.location.href)

        if(result.user.emailVerified){
            //remove user email from localStorage
            localStorage.removeItem('emailForRegistration')
            
            //get user id token
            let user = auth.currentUser
            await user.updatePassword(password)
            const idTokenResult = await user.getIdTokenResult()
            
            //redux store

            createOrUpdateUser(idTokenResult.token)
            .then(res => {
            dispatch(loggedIn(res.data.name, res.data.email,  idTokenResult.token,res.data.role, res.data._id ))
            toast.success('You have been registered and logged in!')
          })
          .catch(err => console.log(err))
            //redirect
            history.push('/')
        }
    } catch (error) {
        toast.error(error.message)
    }
    
  }

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control mb-3" 
      value={email} autoFocus
      placeholder='Enter Your email'
      onChange={e => setEmail(e.target.value)}
      />
      <input type="password" className="form-control mb-3" 
      value={password} autoFocus 
      placeholder='Enter Your password'
      onChange={e => setPassword(e.target.value)}/>
      <button type="submit" className="btn btn-raised">
       Complete Registration
      </button>
    </form>
  )

  return (
    <div className="container p-5">
      <div className="row">
        <div
        
        className="col-md-6 offset-md-3 mt-5">
          <h4>Register Complete</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete
