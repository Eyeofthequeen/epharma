export class Point {
    private _longitude: number
    private _latitude: number

    constructor(longitude: number, latitude: number) {
        this._longitude = longitude
        this._latitude = latitude
    }

    get longitude() {
        return this._longitude
    }

    get latitude() {
        return this._latitude
    }
}