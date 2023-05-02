export function dateForInput(date: Date): string {
    let sep = "-"
    let d = date.toLocaleDateString('fr-FR').split('/')
    return d[2] + sep + d[1] + sep + d[0]
}

export function setAllDictValuesToFalse(dict: any) {
    for(let key in dict) {
      dict[key] = false
    }
}

export function dateToString(date: Date): string {
  return date.toLocaleDateString('en-Ca')
}