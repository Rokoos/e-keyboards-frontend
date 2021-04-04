import React, {Fragment, useState, useEffect} from 'react'
import {auth} from '../firebase'
import {toast} from 'react-toastify'
import { Button} from 'antd'
import { 
  MailOutlined
} from '@ant-design/icons';
import { useSelector} from 'react-redux'  

import Spinner from '../components/Spinner'

const ForgotPassword = ({history}) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const user = useSelector(state => state.user)

    useEffect(() => {
        if(user && user.token)  history.push('/')

    }, [user, history])

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const config = {
                url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
                handleCodeInApp: true
              }
            await auth.sendPasswordResetEmail(email,config)
            setEmail('')
            toast.success('Check your email for password reset link')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
        
    }

    const forgotPassword = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Enter Your Email"
                    className="form-control mb-3" 
                    value={email} onChange={e => setEmail(e.target.value)}
                    autoFocus
                />
                <Button
                    type="primary"
                    shape="round"
                    block
                    icon={<MailOutlined />}
                    onClick={handleSubmit}
                    className="mb-3"
                    size="large"
                    disabled={!email}
                    >Login with Email/Password
                </Button>
            </div>
        </form>
    )

    return (
        <div className="container col-md-6 offset-md-3 p-5 mt-5" >
        {loading ? <Spinner/> :(
            <Fragment>
                <h4 style={{textAlign:'center'}}>Forgot password</h4>
                {forgotPassword()}
            </Fragment>
          )}
        </div>
    )

}

export default ForgotPassword