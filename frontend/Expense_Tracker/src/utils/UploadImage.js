import { Form } from 'react-router-dom'
import {API_PATHS} from './apiPath'
import axiosInstance from './axiosInstance'
const UploadImage=async(imagefile)=>{
const formdata=new FormData();
formdata.append('image',imagefile);
try{
    const  response=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formdata,{
        headers:{
            'Content-Type':'multipart/form-data',
        },
    });
    return response.data;
}catch(error){
    console.error('error while uploading',error);
    throw error;
}
};
export default UploadImage;