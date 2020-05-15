export default class Utils {
    static isOkResponse(response: any) { return response.code.indexOf('S') !== -1; }
}

