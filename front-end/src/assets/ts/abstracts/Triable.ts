export abstract class Triable {
    private _estAsc: boolean = true
    private _list: Object[]
    
    abstract orderByKey(key: string): void

    set list(objets: Object[]) {
        this._list = objets
    }

    get list() { return this._list}
    
    isAsc() {
        return this._estAsc
    }

    compare(a: number | string | Date, b: number | string | Date) {
        return  (a < b ? -1 : 1)
    }
}