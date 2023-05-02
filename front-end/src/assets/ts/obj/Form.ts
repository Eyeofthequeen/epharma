import { Actions, Availabilities, Availability } from "../shared/constants";
import { Field } from "./Field";
import { dateToString } from "../shared/utils";

export class Form {
    private triggered: boolean
    fields: Field[]
    action: Actions
    
    constructor(fields: Field[], action: Actions) {
        this.fields = fields
        this.triggered = false
        this.action = action
    }

    addFields(fields: Field[]) {
        this.fields = this.fields.concat(fields)
    }

    reset() { this.triggered = false }

    isTriggered() { return this.triggered }

    private setValues(entries: any[]) {
        for(let [key, value] of entries) {
            if(value instanceof Date) {
                this.setValue(key, dateToString(value))
                continue
            }
            this.setValue(key, value)
        }
    }

    setValue(key: string, value: any) {
        this.fields.find(field => field.key === key)?.setValue(value)
    }

    setSelection(key: string, value: string[]) {
        this.fields.find(field => field.key === key)?.setChoices(value)
    }

    setAction(action: Actions){
        this.action = action
    }
    
    launch(entries: any[]) {
        this.setValues(entries)
        this.triggered = true
    }
}