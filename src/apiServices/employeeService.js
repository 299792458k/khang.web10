import * as request from '../utils/request'
/**
 * lấy danh sách nhân viêntheo filter
 * @param {số bản ghi trên một trang} pageSize 
 * @param {số trang} pageNumber 
 * @param {từ khoá tìm kiếm} employeeFilter 
 * @returns 
 */
export const getEmployees = async (pageSize, pageNumber, employeeFilter) => {
    try {
        const res = await request.getRequest('Employees/filter', {
            params: {
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
                search: employeeFilter,
            }
        })
        console.log(res);
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const getNewCode = async () => {
    try {
        const res = await request.getRequest('Employees/newEmployeeCode')
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const addEmployee = async (employeeData) => {
    try {
        const res = await request.postRequest('Employees', employeeData)
        return res
    } catch (error) {
        return error
    }
}

export const modifyEmployee = async (employeeData) => {
    try {
        const res = await request.putRequest(`Employees/${employeeData.EmployeeId}`, employeeData)
        return res
    } catch (error) {
        return error
    }
}

export const deleteEmployee = async (employeeId) => {
    try {
        const res = await request.deleteRequest(`Employees/${employeeId}`, {
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteMultiEmployee = async (employeeIdsString) => {
    try {
        const res = await request.postRequest("Employees/deleteMany",
            { RequestValue: employeeIdsString }
        )
        return res
    } catch (error) {
        console.log(error)
    }
}


export const exportToExcel = async () => {
    try {
        const res = await request.getRequest("Employees/export", {
            responseType: 'blob'
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
