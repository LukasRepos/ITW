function ViewModel() {
    this.titleQuery = ko.observable();
    this.titleResults = ko.observable([{
        name: "Title1",
        id: "Noice1",
    }, {
        name: "Title2",
        id: "Noice2",
    }, {
        name: "Title3",
        id: "Noice3",
    }, {
        name: "Title4",
        id: "Noice4",
    }]);
}

ko.applyBindings(new ViewModel());