export default class Utils {
    static currencyFormat = (num: number) => {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
}