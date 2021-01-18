ko.bindingHandlers.autocomplete = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        let data = valueAccessor();

        $("#" + data.target).autocomplete({
            minLength: 2,
            source: (request, response) => {
                let searchFunc = undefined;

                switch (data.type) {
                    case "Titles": {
                        searchFunc = searchForTitles;
                        break;
                    }
                    case "Actors": {
                        searchFunc = searchForActors;
                        break;
                    }
                    case "Countries": {
                        searchFunc = searchForCountries;
                        break;
                    }
                    case "Directors": {
                        searchFunc = searchForDirectors;
                        break;
                    }
                    case "Categories": {
                        searchFunc = searchForCategories;
                        break;
                    }
                }

                if (searchFunc === undefined) {
                    console.error("Undefined type in autocomplete")
                    return;
                }

                searchFunc(request.term, res => {
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
                let getFunc = undefined;
                let formatter = undefined;

                switch (data.type) {
                    case "Titles": {
                        getFunc = getTitleByID;
                        formatter = formatAPITitleResponse;
                        break;
                    }
                    case "Actors": {
                        getFunc = getActorByID;
                        formatter = formatAPIActorResponse;
                        break;
                    }
                    case "Countries": {
                        getFunc = getCountryByID;
                        formatter = formatAPICountryResponse;
                        break;
                    }
                    case "Directors": {
                        getFunc = getDirectorByID;
                        formatter = formatAPIDirectorResponse;
                        break;
                    }
                    case "Categories": {
                        getFunc = getCategoryByID;
                        formatter = formatAPICategoryResponse;
                        break;
                    }
                }

                if (getFunc === undefined || formatter === undefined) {
                    console.error("Undefined type in autocomplete")
                    return;
                }

                getFunc(ui.item.data["Id"], response => {
                    data.obs([formatter(response)]);
                }, this);
            }
        });
    }
};