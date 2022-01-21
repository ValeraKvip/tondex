export function formatPrice(price: number): number|string {
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