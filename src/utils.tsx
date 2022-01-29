export function formatPrice(price: number): number | string {
    try {
        if (!price) {
            return 0;
        }
        let str = price.toFixed(10);
        //   return String(price);
        let result = str;
        // for (let i = 0; i < str.length; i += 3) {
        //     result += str.substring(i, i + 3) + ',';
        // }

        return Number(result)//.substring(0, result.length - 1);
    } catch (e) {
        return 0;
    }
}


export function checkInputIsFloat(str: string): boolean { 
    console.log('#INPUT', str, str.match(/^0?$|^0{1}[.]{1}[0-9]*$|^[1-9]{1}[0-9]*[.]?[0-9]*$/g))
    return str.match(/^0?$|^0{1}[.]{1}[0-9]*$|^[1-9]{1}[0-9]*[.]?[0-9]*$/g) != null;
}

export function checkInputIsInt(str: string): boolean {
    return str.match(/^$|^[1-9]{1}[0-9]*$/g) != null;
}