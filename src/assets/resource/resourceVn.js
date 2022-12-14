export const tableRowFunctions = {
    duplicate: "Nhân bản",
    delete: "Xoá",
    use: "Sử dụng"
}

export const errorMessage = {
    duplicateCode: (data) => `Mã nhân viên <${data}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`,
    exception: "Lỗi hệ thống, vui lòng liên hệ misa."
}

export const gender = {
    female: "Nữ",
    male: "Nam",
    other: "Khác"
};

export const dialogTitles = {
    invalidDate: "Ngày không hợp lệ",
    notDeveloped: "Chức năng chưa phát triển",
    delete: "Xoá?",
    saveChanges: "Lưu thay đổi?",
    duplicateCode: "Trùng mã",
    exception: "Lỗi hệ thống!",
    invalidData: "Dữ liệu không hợp lệ.",
    success: "Thành công!",

};

export const dialogMessage = {
    dataSaved: "Đã lưu thay đổi.",
    employeeAdded: "Thêm mới nhân viên thành công.",
    notDeveloped: "Chức năng đang được phát triển.",
    confirmDelete: (data) => `Bạn có thực sự muốn xoá Nhân viên <${data}> không?`,
    confirmDataChanged: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
    noSelectedRecords: "Không có bản ghi nào được chọn.",
    confirmDeleteMulti: "Bạn có thực sự muốn xoá những nhân viên đã chọn không?",
    deleteMultiSuccess: "Xoá thành công!",
    exceedDate: "Ngày vượt quá ngày hiện tại."
}