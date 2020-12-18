function ViewModel() {
    this.searchResults = ko.observable();

    this.query = ko.observable();
    this.query.subscribe(async latest => {
        let actors = await searchForActors(latest);
        actors = actors.slice(0, 10).map(async val => {
            let actor = await getActorsByID(val["Id"]);
            let titles = actor["Titles"]
            titles.forEach(val => ({name: val}))
            return {
                "id": val["Id"],
                "name": val["Name"],
                "numberTitles": val["Titles"],
                "titles": titles
            }
        });
        actors.sort((a, b) => b["numberTitles"] - a["numberTitles"]);
        console.log(actors)
        this.searchResults(actors);
    }, this);

}

ko.applyBindings(new ViewModel());