function ViewModel() {
    this.searchResults = ko.observable();

    this.query = ko.observable();
    this.query.subscribe((latest) => {
        $.ajax({
            url: `http://192.168.160.58/netflix/api/Search/Actors?name=${latest}`,
            type: "GET",
            dataType: "json",
            success: result => {
                let topRes = result.slice(0, 10)
                topRes = topRes.map(val => ({
                    "id": val["Id"],
                    "name": val["Name"],
                    "numberTitles": val["Titles"]
                }));

                topRes.sort((a, b) => b["numberTitles"] - a["numberTitles"]);
                this.searchResults(topRes);
            },
            error: (_, status, err) => {
                console.error("App failed with status " + status);
                console.error(err);
            }
        });
    }, this);

}

ko.applyBindings(new ViewModel());