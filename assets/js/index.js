function ViewModel() {
    const NUMBER_TITLE_RECORDS = 10;
    const TITLE_PAGESIZE = 50;

    this.maxPageSize = 11;
    this.currentPage = ko.observable(1);
    this.totalTitlePages = ko.observable(1);
    this.titleSearchResults = ko.observableArray();
    this.titleQuery = ko.observable();

    this.titleDetailedInfo = function (id) {
        getTitleByID(id, res => {
            this.titleSearchResults.push({
                actors: res["Actors"].map(val => ({id: val["Id"], name: val["Name"]})),
                categories: res["Categories"].map(val => ({id: val["Id"], name: val["Name"]})),
                countries: res["Countries"].map(val => ({id: val["Id"], name: val["Name"]})),
                directors: res["Directors"].map(val => ({id: val["Id"], name: val["Name"]})),
                name: res["Name"],
                added: res["DateAdded"],
                description: res["Description"],
                duration: res["Duration"],
                id: res["Id"],
                rating: res["Rating"] ? {
                    id: res["Rating"]["Id"],
                    code: res["Rating"]["Code"]
                } : null,
                yearOfRelease: res["ReleaseYear"],
                type: {
                    id: res["Type"]["Id"],
                    name: res["Type"]["Name"]
                }
            });
        }, this);
    }

    this.getTitlePage = function (page) {
        getTitlesPage(page, TITLE_PAGESIZE, res => {
            this.totalTitlePages(res["TotalPages"]);
            res["Titles"].forEach(val => {
                this.titleDetailedInfo(val["Id"]);
            });
        }, this);
    }

    this.titlePaginationArray = function () {
        let list = [];
        let offset = Math.trunc((this.maxPageSize - 1) / 2);

        let left = this.currentPage() - offset;
        let right = this.currentPage() + offset;

        let newLeft = left > 1 ? left : 1;
        let newRight = right < this.totalTitlePages() ? right : this.totalTitlePages();

        for (let i = newLeft + newRight - right; i <= newRight + newLeft - left; i++) {
            list.push(i);
        }

        return list;
    }

    this.setCurrentTitlePage = page => {
        if (page) this.currentPage(page);
    }

    this.nextTitlePage = () => {
        this.currentPage(this.currentPage() + 1);
    }

    this.prevTitlePage = () => {
        this.currentPage(this.currentPage() - 1);
    }

    this.titleQuery.subscribe((latest) => {
        if (latest === "") {
            this.getTitlePage(this.currentPage());
            return;
        }

        this.titleSearchResults([]);
        searchForTitles(latest, res => {
            res = res.slice(0, NUMBER_TITLE_RECORDS);
            res.forEach(val => (this.titleDetailedInfo(val["Id"])));
        }, this);
    }, this);

    this.currentPage.subscribe(latest => {
        console.log("LATEST", latest);
        this.titleSearchResults([]);
        this.getTitlePage(latest)
    }, this);

    // initialization
    this.getTitlePage(1);
}

ko.applyBindings(new ViewModel());