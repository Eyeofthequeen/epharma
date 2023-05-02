export class Alert {
    private _title: string
    private _message: string

    constructor(title: string, message: string) {
        this._title = title
        this._message = message
    }

    get title() {
        return this._title
    }

    get message() {
        return this._message
    }
}