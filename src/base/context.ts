export const success = async function (data = '操作成功') {
    return this.body = {
        code: 1,
        info: '操作成功',
        actionStatus: "OK",
        errorInfo: "",
        errorCode: 0,
        data
    }
}
export const fail = async function (errorInfo = '', errorCode = 0) {
    return this.body = {
        code: 0,
        info: "操作失败，请重试",
        actionStatus: "FAIL",
        errorInfo,
        errorCode
    }
}
