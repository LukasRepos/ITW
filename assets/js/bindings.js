ko.bindingHandlers.autocomplete = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        let selectedObservableArrayInViewModel = valueAccessor();

        $("#TitleSearchBar").autocomplete({
            minLength: 2,
            source: (request, response) => {
                searchForTitles(request.term, res => {
                    res = res.slice(0, 5);
                    let result = [];

                    for (let i = 0; i < res.length; i++) {
                        result.push({
                            label: res[i]["Name"],
                            value: res[i]["Name"],
                            data: res[i]
                        });
                    }
                    response(result);
                }, this);
            },
            select: (item, ui) => {
                getTitleByID(ui.item.data["Id"], response => {
                    let date = new Date(response["DateAdded"])
                    selectedObservableArrayInViewModel([{
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
                    }]);
                }, this);
            }
        });
    }
};