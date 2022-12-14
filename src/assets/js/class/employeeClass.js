class FormData {
    constructor(
        EmployeeId,
        EmployeeCode,
        FullName,
        EmployeeRole,
        DateOfBirth,
        Gender,
        IdentityNumber,
        IdentityDate,
        IdentityPlace,
        Address,
        Email,
        PhoneNumber,
        TablePhoneNumber,
        BankAccountNumber,
        BankName,
        BankPlace,
        PositionName,
        DepartmentId,
        DepartmentCode,
        DepartmentName,
        // CreatedDate,
        // CreatedBy,
        // ModifiedDate,
        // ModifiedBy,
    ) {
        this.EmployeeId = EmployeeId !== null ? EmployeeId : null,
            this.EmployeeCode = EmployeeCode !== null ? EmployeeCode : null,
            this.FullName = FullName !== null ? FullName : null,
            this.EmployeeRole = EmployeeRole !== null ? EmployeeRole : null,
            this.DateOfBirth = DateOfBirth !== null ? DateOfBirth : null,
            this.Gender = Gender !== undefined !== null ? Gender : null,
            this.IdentityNumber = IdentityNumber !== null ? IdentityNumber : null,
            this.IdentityDate = IdentityDate !== null ? IdentityDate : null,
            this.IdentityPlace = IdentityPlace !== null ? IdentityPlace : null,
            this.Address = Address !== null ? Address : null,
            this.Email = Email !== null ? Email : null,
            this.PhoneNumber = PhoneNumber !== null ? PhoneNumber : null,
            this.TablePhoneNumber = TablePhoneNumber !== null ? TablePhoneNumber : null,
            this.BankAccountNumber = BankAccountNumber !== null ? BankAccountNumber : null,
            this.BankName = BankName !== null ? BankName : null,
            this.BankPlace = BankPlace !== null ? BankPlace : null,
            this.PositionName = PositionName !== null ? PositionName : null,
            this.DepartmentId = DepartmentId !== null ? DepartmentId : null,
            this.DepartmentCode = DepartmentCode !== null ? DepartmentCode : null,
            this.DepartmentName = DepartmentName !== null ? DepartmentName : null
        // this.CreatedDate = CreatedDate !== null ? CreatedDate : null,
        // this.CreatedBy = CreatedBy !== null ? CreatedBy : null,
        // this.ModifiedDate = ModifiedDate !== null ? ModifiedDate : null,
        // this.ModifiedBy = ModifiedBy !== null ? ModifiedBy : null
    }
}

export default FormData;





