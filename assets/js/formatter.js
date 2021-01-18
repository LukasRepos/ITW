let formatAPITitleResponse = response => {
    let date = new Date(response["DateAdded"])
    return {
        actors: response["Actors"].map(val => ({id: val["Id"], name: val["Name"]})),
        categories: response["Categories"].map(val => ({id: val["Id"], name: val["Name"]})),
        countries: response["Countries"].map(val => ({id: val["Id"], name: val["Name"]})),
        directors: response["Directors"].map(val => ({id: val["Id"], name: val["Name"]})),
        name: response["Name"],
        added: date.toLocaleDateString(),
        description: response["Description"],
        duration: response["Duration"],
        id: response["Id"],
        rating: response["Rating"] ? {
            id: response["Rating"]["Id"],
            code: response["Rating"]["Code"]
        } : null,
        yearOfRelease: response["ReleaseYear"],
        type: {
            id: response["Type"]["Id"],
            name: response["Type"]["Name"]
        }
    }
}

let formatAPIActorResponse = response => ({
    name: response["Name"],
    id: response["Id"],
    titles: response["Titles"].map(val => ({name: val["Name"], id: val["Id"]}))
})

let formatAPICountryResponse = response => ({
    name: response["Name"],
    id: response["Id"],
    titles: response["Titles"].map(val => ({name: val["Name"], id: val["Id"]}))
})

let formatAPIRatingResponse = response => ({
    id: response["Id"],
    code: response["Code"],
    "class": response["Classe"],
    desc: response["Description"],
    titles: response["Titles"].map(title => ({id: title["Id"], name: title["Name"]}))
})

let formatAPICategoryResponse = response => ({
    id: response["Id"],
    name: response["Name"],
    titles: response["Titles"].map(title => ({id: title["Id"], name: title["Name"]}))
})

let formatAPIDirectorResponse = response => ({
    id: response["Id"],
    name: response["Name"],
    titles: response["Titles"].map(title => ({id: title["Id"], name: title["Name"]}))
})