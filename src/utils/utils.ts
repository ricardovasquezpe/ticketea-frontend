export default class Utils {
    static currencyFormat = (num: number) => {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    static calculatePercentageAdd = (price: number, originalPrice: number) => {
        var calculated = (((price * 100) / originalPrice) - 100).toFixed(0);
        return  (Number(calculated) < originalPrice) ? "+" + calculated : calculated;
    }

    static validateImageFileType = (type: string) => {
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(type)) return false;
        return true;
    }
}