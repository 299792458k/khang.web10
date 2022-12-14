import * as request from '../utils/request'
export const getAllPositions = async () => {
    try {
        const res = await request.getRequest('Positions')
        return res;
    } catch (e) {
        console.log(e)
    }
}