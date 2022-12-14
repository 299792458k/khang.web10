import * as request from '../utils/request'
export const getAllDepartments = async () => {
    try {
        const res = await request.getRequest('Departments')
        return res;
    } catch (e) {
        console.log(e)
    }
}