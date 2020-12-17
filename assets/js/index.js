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
                this.searchResults(topRes.map(val => ({"name": val["Name"]})));
            },
            error: (_, status, err) => {
                console.error("App failed with status " + status);
                console.error(err);
            }
        });
    }, this);

}

ko.applyBindings(new ViewModel());