import React from 'react'
import { Link} from 'react-router-dom'
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';

const { Meta } = Card;

const AdminProductCard = ({product, handleRemove}) => {
    const { title, description,  images, slug} = product
  return (
    <Card className="m-3"
    style={{  display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}
    hoverable
    cover={<img 
        // style={{height: '150px',width:"auto", objectFit:'cover'}}
        alt="example" src={images && images.length ? images[0].url : ''}/>}
    actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined
            className="text-warning"
            />
          </Link>, 
          <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
          />
        ]}
    >
        <Meta title={title} description={`${description && description.substring(0, 30)}...`} />
    </Card> 
  )
}

export default AdminProductCard


