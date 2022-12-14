// lớp Rule
class RuleObject {
    constructor(handlerName, data) {
        this.handlerName = handlerName,
            this.data = data ? data : ""
    }
}

// object trả về sau khi hàm Validator chạy
class ReturnObject {
    constructor(isValid, errorMessage) {
        this.isValid = isValid,
            this.errorMessage = errorMessage
    }
}

/**
* hàm validate input element
* @param {element} input element
* @returns null
* Created By KhangPC (12/12/2022)
*/
function Validator(element) {
    let errorMessage = "";
    const elementValue = element.modelValue
    const elementName = element.label
    const ruleObjects = [];
    const rules = element.$attrs['rules'];
    if (rules) {
        const rulesArr = rules.split(" ")
        // lặp qua rulesArray để lấy ruleObjects
        for (let i = 0; i < rulesArr.length; i++) {
            if (rulesArr[i] === 'required') {
                ruleObjects.push(new RuleObject(rulesArr[i], elementName))
            }
            else if (rulesArr[i].includes(':')) {
                let ruleData = rulesArr[i].split(':');
                ruleObjects.push(new RuleObject(ruleData[0], ruleData[1]))
            } else {
                ruleObjects.push(new RuleObject(rulesArr[i]))
            }
        }
        // lặp qua ruleObjects để validate
        for (let i = 0; i < ruleObjects.length; i++) {
            // res: tra ve error message, neu valid res = undefined
            const res = Validator[ruleObjects[i].handlerName](ruleObjects[i].data)(elementValue)
            if (res) {
                errorMessage = res
                break;
            }
        }
    }
    if (errorMessage) {
        element.$el.classList.add('error')
        element.$refs.errorMessage.innerHTML = errorMessage;
        return new ReturnObject(false, errorMessage);
    } else {
        return new ReturnObject(true);
    }
}


// Dinh nghia cac rules 

/**
 * rule trường bắt buộc
 * @returns message lỗi nếu có
 * Created By Khang (12/12/2022)
 */
Validator.required = function (elementName) {
    return function (elementValue) {
        return elementValue ? undefined : `${elementName} không được để trống.`
    }
}

/**
 * rule độ dài tối thiểu
 * @param {độ dài tối thiểu} ruleData 
 * @returns message lỗi nếu có
 * Created By Khang (12/12/2022)
 */
Validator.min = function (minLength) {
    return function (elementValue) {
        return elementValue.length >= minLength ? undefined : `Nhập tối thiểu ${minLength} ký tự.`
    }
}

/**
 * rule độ dài tối đa
 * @param {độ dài tối đa} ruleData 
 * @returns message lỗi nếu có
 * Created By Khang (12/12/2022)
 */
Validator.max = function (maxLength) {
    return function (elementValue) {
        return elementValue.length <= maxLength ? undefined : `Nhập tối đã ${maxLength} ký tự.`
    }
}

/**
 * định dạng email
 * @returns message lỗi nếu có
 * Created By Khang (12/12/2022)
 */
Validator.email = function () {
    return function (elementValue) {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(elementValue)) {
            return undefined
        }
        else {
            return 'Sai định dạng email.'
        }
    }

}

/**
 * định dạng bất kỳ
 * @param {format} format cần định dạng
 * @returns message lỗi nếu có
 * Created By Khang (12/12/2022)
 */
Validator.format = function (format) {
    format = new RegExp(format)
    console.log(format)
    return function (elementValue) {
        console.log(format.test(elementValue))
        return format.test(elementValue) ? undefined : `Sai định dạng (NVxx...x, x là chữ số).`
    }
}

export default Validator

