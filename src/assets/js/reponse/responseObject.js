/**
* object trả về từ request
* @returns null
* Created By KhangPC (12/12/2022)
*/
class ResponseObject {
    constructor(status, content, errorCode) {
        // trạng thái response
        this.status = status;
        // nội dung trả vể
        this.content = content;
        // errcode
        this.errorCode = errorCode;
    }
}

export default ResponseObject;
