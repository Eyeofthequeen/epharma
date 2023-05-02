import { ValidatorFn } from "@angular/forms"
import { TypeOfField, TypeOfFieldHTML } from "../shared/constants"

export class Field {
    key: string
    label: string
    value: any
    required = true
    isActif = true
    choices: string[] = []
    options = {}
    type = TypeOfField.Text
    typeHTML = TypeOfFieldHTML.Text
    additionalValidations: ValidatorFn[] = []

    constructor(key: string, label: string) {
        this.key = key
        this.label = label
    }

    setValue(value: any) {
        this.value = value
    }

    setChoices(choices: string[]) {
        this.choices = choices
    }
}

interface IFieldBuilder {
    notRequired(): this
    buildChoices(choices: []): this
    buildOptions(options: {}): this
    buildTextArea(): this
    buildText(type: TypeOfFieldHTML): this
    getField(): Field
}

class FieldBuilder implements IFieldBuilder {
    private field: Field

    constructor(key: string, label: string) {
        this.field = new Field(key, label)
    }

    private aucunTypeHTML() {
        this.field.typeHTML = TypeOfFieldHTML.None
    }

    notRequired(): this {
        this.field.required = false
        return this
    }

    notActif(): this {
        this.field.isActif = false
        return this
    }

    buildAdditionalValidations(validations: ValidatorFn[]): this {
        this.field.additionalValidations = validations
        return this
    }

    buildChoices(options: {}): this {
        this.field.options = options
        this.field.type = TypeOfField.Checkbox
        this.aucunTypeHTML()
        return this
    }

    buildOptions(choices: string[]): this {
        this.field.choices = choices
        this.field.type = TypeOfField.Selection
        this.aucunTypeHTML()
        return this
    }

    buildTextArea(): this {
        this.field.type = TypeOfField.TextArea
        this.aucunTypeHTML()
        return this
    }

    buildLocalisation(): this {
        this.field.type = TypeOfField.Localisation
        this.aucunTypeHTML()
        return this
    }

    buildText(type: TypeOfFieldHTML): this {
        this.field.typeHTML = type
        return this
    }

    buildSlider(): this {
        this.field.type = TypeOfField.Slider
        this.aucunTypeHTML()
        return this
    }

    getField(): Field {
        return this.field
    }
}

export class FieldDirector {
    private static chantier: FieldBuilder

    private static base(key: string, label: string, required: boolean, isActif: boolean) {
        this.chantier = new FieldBuilder(key, label)

        if (!isActif) { this.chantier = this.chantier.notActif() }
        if (!required) { this.chantier = this.chantier.notRequired() }
    }

    static selection(key: string, label: string, choices: string[], required = true, isActif = true): Field {
        this.base(key, label, required, isActif)
        return this.chantier.buildOptions(choices).getField()
    }

    static checkbox(key: string, label: string, options: {}, additionalValidations: ValidatorFn[], required = true, isActif = true): Field {
        this.base(key, label, required, isActif)
        this.chantier = this.chantier.buildAdditionalValidations(additionalValidations)
        return this.chantier.buildChoices(options).getField()
    }

    static textArea(key: string, label: string, required = true, isActif = true): Field {
        this.base(key, label, required, isActif)
        return this.chantier.buildTextArea().getField()
    }

    static text(key: string, label: string, typeHTML: TypeOfFieldHTML, required = true, isActif = true): Field {
        this.base(key, label, required, isActif)
        return this.chantier.buildText(typeHTML).getField()
    }

    static localisation(key: string, label: string, required = true, isActif = true): Field {
        this.base(key, label, required, isActif)
        return this.chantier.buildLocalisation().getField()
    }

    static slider(key: string, label: string, required = true, isActif = true): Field {
        this.base(key, label, required, isActif)
        return this.chantier.buildSlider().getField()
    }
}