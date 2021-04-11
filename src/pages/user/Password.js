import React, {useState} from 'react'
import UserNav from './UserNav'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'

const Password = () => {

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    await auth.currentUser.updatePassword(password)
    .then(() => {
      setLoading(false)
      toast.success('Password updated!')
      setPassword('')
    })
    .catch(err => {
      setLoading(false)
      toast.error(err.message)
    })
  }

  const passwordUpdate = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type="password" 
          className="form-control"
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter new password"
          disabled={loading}
          value={password}
          />
          <button 
          disabled={!password || password.length < 6 || loading}
          className="btn btn-primary">
            Update password
          </button>
      </div>
    </form>
  )

  return (
    <div className="container checkout_margin">
        <div className="user_menu"> 
              <UserNav/>
            <div className="col mt-3">
              <h4>Password Update</h4>
              {loading ? <Spinner/> : passwordUpdate()}
            </div>
        </div>
        </div>
  )
}

export default Password
