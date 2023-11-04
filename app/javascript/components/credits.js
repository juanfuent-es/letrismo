/**
 * @author JuanFuent.es
 * @desc Imprime en consola del browser créditos
 * @param { String } Message
 */
export default class Credits {
    constructor(msg = "Lorem Credits") {
        this.msg = [
            `%c %c ${msg} `,
            'background: magenta; padding: 5px 0;',
            'background: black; color: cyan; padding: 5px 5px 5px 5px;'
        ]
        this.roll()
    }
    
    roll() {
        console.log.apply(console, this.msg)
    }
}