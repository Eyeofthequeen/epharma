export class Search {
    private origin: Array<any>
    private list: Array<any>

    constructor(list: Object[]) {
        this.origin = this.list = list
    }

    execute(key: string, entry: string) {
        this.list = this.origin
        const filterd = this.list.filter(item => item[key].toLowerCase().includes(entry))
        if (!(filterd.length === 0)) {
            this.list = filterd
        }
    }

    getList() {
        return this.list
    }
}