export enum TypeOfDrug {
    Comprime = "comprime",
    Capsule = "capsule",
    Injectable = "injectable",
    Inhalateur = "inhalateur",
    Liquide = "liquide"
}

export enum TypeOfExpiration {
    Eminent = 'Éminent',
    Expired = 'Expiré'
}

export enum DrugStatus {
    Expired,
    OutOfStock,
    Ok
}

export enum Availability {
    InStock = "inStock",
    OutOfStock = "outOfStock",
    Unavailable = "unavailable"
}

export const Availabilities = {inStock: "En stock", unavailable: "Indisponible", outOfStock: "Rupture def."}

export enum Headers {
    LastName = "Nom",
    FirstName = "Prenom",
    Lot = "Lot",
    Quantity = "Quantité",
    Expiration = "Date d'expiration",
    Type = "Type",
    Concentration = "Concentration",
    Price = "Prix",
    Drug = "Médicament",
    Date = "Date",
    Insurance = "Assu.",
    DateOfBirth = "Date naissance",
    Telephon = "Téléphone",
    Email = "Courriel",
    User = "Usager",
    HiredDate = "Date d'embauche",
    Pharmacy = "Pharmacie",
    Button = ""
}

export enum Actions {
    Edit = "Modifier",
    Archive = "Archiver",
    Consult = "Consulter",
    Add = "Ajouter",
    Respond = "Répondre",
    Close = "Fermer"
}

export enum Filters {
    Header,
    Checkbox,
    List
}

export enum TypeOfRegistering {
    Pharmacist,
    Client,
    Employee
}

export enum ProfessionnalLabel {
    Pharmacist = "Pharmacien Dr.",
    LabTech = "Technicien.ne en laboratoire",
    Nurse = "Infirmier.e clinicien.ne"
}

export enum TypeOfField {
    Text = "text",
    Checkbox = "checkbox",
    Selection = "selection",
    TextArea = "textarea",
    Localisation = "localisation",
    Slider = "slider"
}

export enum TypeOfFieldHTML {
    Text = "text",
    Num = "number",
    Date = "date",
    Email = "email",
    Tel = "tel",
    Hidden = "hidden",
    None = ""
}

export enum Permission {
    Administration,
    UserAdmin,
    User
}

export enum Role {
    Administration = "Administration",
    UserAdmin = "UserAdmin",
    User = "User"
}

export enum Professionnal {
    Pharmacist = "Pharmacist",
    LabTech = "LabTech",
    Nurse = "Nurse",
    None = "None"
}