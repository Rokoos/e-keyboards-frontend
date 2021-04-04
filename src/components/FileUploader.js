import React, { Fragment } from 'react'
import Resizer from 'react-image-file-resizer'
import { useSelector} from 'react-redux'
import axios from 'axios'
import { Avatar, Badge} from "antd"


const FileUploader = ({setValues, setLoading, values}) => {

    const user = useSelector(state => state.user)

    const fileUploadAndResize =  (e) => {
        let files = e.target.files
        let allUploadedFiles = values.images

        if(files){
            setLoading(true)
            for(let file of files){
                Resizer.imageFileResizer(
                    file, 
                    720, 
                    720, 
                    'JPEG', 
                    100, 
                    0, 
                    (uri) => {
                     axios.post(`${process.env.REACT_APP_API}/uploadimages`, 
                    { image: uri},
                    {
                        headers: {
                            authtoken: user ? user.token : ""
                        }
                    })
                    .then(res => {
                        setLoading(false)
                        allUploadedFiles.push(res.data)
                        setValues({...values, images: allUploadedFiles})
                    })
                    .catch(err => {
                        setLoading(false)
                    })
                }, "base64")
            }
        }
        
    }

    
    const handleImageRemove = public_id => {
       setLoading(true)

       axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id}, {
        headers: {
            authtoken: user ? user.token : ""
        }
       })
       .then(res => {
        setLoading(false)
        const { images} = values
        let filteredImages = images.filter(item => item.public_id !== public_id)
        setValues({...values, images: filteredImages})
       })
       .catch(err => {
        setLoading(false)
    })
    }
  return (
      <Fragment>
      <div className="row"
      style={{display: 'flex', justifyContent: 'center'}}>
        {values.images && values.images.map(image => 
            <Badge 
            style={{cursor:'pointer', zIndex: '1000'}}
            onClick={() => handleImageRemove(image.public_id)}
            key={image.public_id}
            count="X">
                <Avatar
                className="mr-3"  
                src={image.url}
                size={100}
                shape="square"
                /> 
            </Badge>
            )}
      </div>
        <div className="row mt-3 "
        style={{display: 'flex', justifyContent: 'center'}}>
            <label className="btn btn-primary btn-raised" >Choose file
                <input 
                hidden
                type="file" multiple accept="images/*"
                onChange={fileUploadAndResize}/>
            </label>
        </div>
    </Fragment>
  )
}

export default FileUploader
