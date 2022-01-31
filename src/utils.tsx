export function formatPrice(price: number): number | string {
    try {
        if (!price) {
            return 0;
        }
        let str = price.toFixed(10);
  
        let result = str;

        return Number(result)
    } catch (e) {
        return 0;
    }
}


export function checkInputIsFloat(str: string): boolean {
    return str.match(/^0?$|^0{1}[.]{1}[0-9]*$|^[1-9]{1}[0-9]*[.]?[0-9]*$/g) != null;
}

export function checkInputIsInt(str: string): boolean {
    return str.match(/^$|^[1-9]{1}[0-9]*$/g) != null;
}


export function delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}

export function bigNumberFormat(num:number, digits:number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }