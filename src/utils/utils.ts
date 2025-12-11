// 处理接口返回的数据
export const handleResponseData = (data: any): any => {
    let newArr: Record<any, any>[] = []
    if (Array.isArray(data)) {
        data.forEach(item => {
            if (Object.prototype.toString.call(item) == '[object Object]') {
                const objItem: Record<any, any> = {}

                for (const key in item) {
                    const str: string = key
                    const strArr = str.split('_')
                    if (strArr.length > 1) {
                        const strSplitKey = strArr[0] + strArr[1].slice(0, 1).toLocaleUpperCase() + strArr[1].slice(1)
                        objItem[strSplitKey] = item[key]
                    } else {
                        objItem[str] = item[key]
                    }

                }
                newArr = [...newArr, objItem]
            }
        })
        return newArr
    }
    return data


};

export function simpleKeyLengthVerification(publicKey: string) {
    console.log("====简单密钥长度验证====");
    // 方法1: 通过公钥 PEM 内容估算
    const pubKeyLines = publicKey.split('\n');
    const pubKeyBase64 = pubKeyLines.slice(1, -2).join(''); // 移除头尾行
    const pubKeyLength = Buffer.from(pubKeyBase64, 'base64').length * 8;
    console.log(`公钥估算长度: ${pubKeyLength} 位`);
    return pubKeyLength
}
