export default class Utils {
    static currencyFormat = (num: number) => {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    static calculatePercentageAdd = (price: number, originalPrice: number) => {
        if(originalPrice == 0) return 0;
        var calculated = (((price * 100) / originalPrice) - 100).toFixed(0);
        if (calculated == "-0") return 0;
        
        return  (price > originalPrice) ? "+" + calculated : "-" + -(calculated);
    }

    static validateImageFileType = (type: string) => {
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(type)) return false;
        return true;
    }

    static generateRandom = (min = 0, max = 100) =>{
        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor( rand * difference);
        rand = rand + min;
        return rand;
    }
}