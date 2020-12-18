function ViewModel() {
    this.searchResults = ko.observable();

    this.query = ko.observable();
    this.query.subscribe(latest => {
        let actors = searchForActors(latest);
        actors = actors.slice(0, 10).map(val => {
            let actor = getActorsByID(val["Id"]);
            let titles = actor["Titles"]
            titles = titles.map(val => ({titleName: val["Name"], titleId: val["Id"]}));
            return {
                id: val["Id"],
                name: val["Name"],
                numberTitles: val["Titles"],
                titles: titles
            }
        });
        actors.sort((a, b) => b["numberTitles"] - a["numberTitles"]);
        this.searchResults(actors);
        console.log(actors)
    }, this);

}

ko.applyBindings(new ViewModel());