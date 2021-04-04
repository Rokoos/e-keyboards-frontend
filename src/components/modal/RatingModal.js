import React , {Fragment, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Modal} from 'antd'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import {toast} from 'react-toastify'

const RatingModal = ({children}) => {

    let history = useHistory()
    let {slug} = useParams()

    const user = useSelector(state => state.user)
    const [modalVisible, setModalVisible] = useState(false)
    const handleModal = () => {
        if(user && user.token){
            setModalVisible(true)
        }else{
            history.push({
                pathname: '/login',
                state: {from: `/product/${slug}`}
            })
        }
    }


  return (
    <Fragment>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br/>
        {user ? "Leave rating" : 'Login to leave rating'}
      </div>
      <Modal 
      title="Rating"
      centered
      visible={modalVisible}
      onOk={() => {
        setModalVisible(false)
        toast.success('Thanks for Your rating!!')
      }  }
      onCancel={() => setModalVisible(false)}
      >{children}</Modal>
    </Fragment>
  )
}

export default RatingModal
