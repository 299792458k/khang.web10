import axios from 'axios'

import ResponseObject from '@/assets/js/reponse/responseObject';
import { baseApiUrl } from '@/assets/js/constants/constants.js'
const request = axios.create({
    baseURL: baseApiUrl,
    headers: {
        'X-Custom-Header': 'application/json'
    }
})
/**
 * request lấy dữ liệu
 * @param {đường dẫn} path 
 * @param {option config} option 
 * @returns 
 * Created By KhangPC(12/12/2022)
 */
export const getRequest = async (path, option = {}) => {
    let responseObject;
    try {
        const response = await request.get(path, option);
        responseObject = new ResponseObject(response.status, response.data)
        console.log(response.data)
    } catch (error) {
        responseObject = new ResponseObject(error.response.status, error.response.data.userMsg, error.response.data.errorCode)
    }
    return responseObject;
}


/**
 * post request
 * @param {đường dẫn} path 
 * @param {*} option 
 * @returns 
 * Created By KhangPC(12/12/2022)
 */
export const postRequest = async (path, option = {}) => {
    let responseObject;
    try {
        let res = await request.post(path, option);
        responseObject = new ResponseObject(res.status, res.data)
    } catch (error) {
        responseObject = new ResponseObject(error.response.status, error.response.data.userMsg, error.response.data.errorCode)
    }
    return responseObject;
}

/**
 * put request
 * @param {đường dẫn} path 
 * @param {*} option 
 * @returns 
 * Created By KhangPC(12/12/2022)
 */
export const putRequest = async (path, option = {}) => {
    let responseObject;
    try {
        const res = await request.put(path, option);
        responseObject = new ResponseObject(res.status, res.data);
    } catch (error) {
        responseObject = new ResponseObject(error.response.status, error.response.data.userMsg, error.response.data.errorCode);
    }
    return responseObject;
}

/**
 * request xoá
 * @param {đường dẫn} path 
 * @param {} option 
 * @returns 
 * Created By KhangPC(12/12/2022)
 */
export const deleteRequest = async (path, option = {}) => {
    let responseObject;
    try {
        const response = await request.delete(path, option);
        responseObject = new ResponseObject(response.status, response.data);
    } catch (error) {
        responseObject = new ResponseObject(error.response.status, error.response.data.userMsg, error.response.data.errorCode)
    }
    return responseObject;
}