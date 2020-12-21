function ViewModel() {
    const NUMBER_RECORDS = 20;
    const PAGESIZE = 20;

    this.maxPageSize = 11;

    this.customSearchCountryVisible = ko.observable(false);
    this.customSearchCategoryVisible = ko.observable(false);
    this.customSearchActorVisible = ko.observable(false);
    this.customSearchResults = ko.observableArray();
    this.customSearchTitle = ko.observable();
    this.customSearchCountry = ko.observable();
    this.customSearchCategory = ko.observable();
    this.customSearchActor = ko.observable();

    this.currentTitlePage = ko.observable(1);
    this.totalTitlePages = ko.observable(1); // REVERT: 1
    this.titleSearchResults = ko.observableArray();
    this.titleQuery = ko.observable();
    this.currentTitleInfo = ko.observable({
        actors: "",
        categories: "",
        countries: "",
        directors: "",
        name: "",
        added: "",
        description: "",
        duration: "",
        id: "",
        rating: "",
        yearOfRelease: "",
        type: ""
    });
    this.bookmarkedTitles = ko.observableArray();

    this.actorSearchResults = ko.observableArray();
    this.actorQuery = ko.observable();
    this.currentActorPage = ko.observable(1);
    this.totalActorPages = ko.observable(1);
    this.currentActorInfo = ko.observable({
        name: "",
        id: "",
        titles: []
    });

    this.countrySearchResults = ko.observableArray();
    this.countryQuery = ko.observable();
    this.currentCountryPage = ko.observable(1);
    this.totalCountryPages = ko.observable(1);
    this.currentCountryInfo = ko.observable({
        name: "",
        id: "",
        titles: []
    });

    this.performSearch = () => {
        this.customSearchResults([]);
        searchForTitles(this.customSearchTitle(), res => {
            res.forEach(val => getTitleByID(val["Id"], title => {
                let inCountries = title["Countries"].map(count => count["Name"]).includes(this.customSearchCountry());
                let inCategories = title["Categories"].map(cat => cat["Name"]).includes(this.customSearchCategory());
                let inActors = title["Actors"].map(act => act["Name"]).includes(this.customSearchActor());

                let toAdd = true;

                if (!inCountries && this.customSearchCountryVisible()) {
                    console.log("Failed by Country");
                    toAdd = false;
                }

                if (!inCategories && this.customSearchCategoryVisible()) {
                    console.log("Failed by Category");
                    toAdd = false;
                }

                if (!inActors && this.customSearchActorVisible()) {
                    console.log("Failed by Actors");
                    toAdd = false;
                }

                if (toAdd)
                    this.customSearchResults.push(this.formatAPITitleResponse(title));
            }, this));
        }, this);
    }

    this.titleDetailedInfo = id => {
        getTitleByID(id, res => {
            this.titleSearchResults.push(this.formatAPITitleResponse(res));
        }, this);
    }

    this.actorDetailedInfo = id => {
        getActorByID(id, res => {
            this.actorSearchResults.push(this.formatAPIActorResponse(res));
        }, this);
    }

    this.countryDetailedInfo = id => {
        getCountryByID(id,res => {
            this.countrySearchResults.push(this.formatAPICountryResponse(res));
        }, this);
    }

    this.getTitlePage = page => {
        this.titleSearchResults([]);
        getTitlesPage(page, PAGESIZE, res => {
            this.totalTitlePages(res["TotalPages"]);
            res["Titles"].forEach(val => this.titleDetailedInfo(val["Id"]) );
        }, this);
    }

    this.getActorPage = page => {
        this.actorSearchResults([]);
        getActorsPage(page, PAGESIZE, res => {
            this.totalActorPages(res["TotalPages"]);
            res["Actors"].forEach(val => this.actorDetailedInfo(val["Id"]));
        }, this);
    }

    this.getCountryPage = page => {
        this.countrySearchResults([]);
        getCountriesPage(page, PAGESIZE, res => {
            this.totalCountryPages(res["TotalPages"]);
            res["Countries"].forEach(val => this.countryDetailedInfo(val["Id"]));
        });
    }

    this.titlePaginationArray = () => {
        let list = [];
        let offset = Math.trunc((this.maxPageSize - 1) / 2);

        let left = this.currentTitlePage() - offset;
        let right = this.currentTitlePage() + offset;

        let newLeft = left > 1 ? left : 1;
        let newRight = right < this.totalTitlePages() ? right : this.totalTitlePages();

        for (let i = newLeft + newRight - right; i <= newRight + newLeft - left; i++) {
            list.push(i);
        }

        return list;
    }

    this.actorPaginationArray = () => {
        let list = [];
        let offset = Math.trunc((this.maxPageSize - 1) / 2);

        let left = this.currentActorPage() - offset;
        let right = this.currentActorPage() + offset;

        let newLeft = left > 1 ? left : 1;
        let newRight = right < this.totalActorPages() ? right : this.totalActorPages();

        for (let i = newLeft + newRight - right; i <= newRight + newLeft - left; i++) {
            list.push(i);
        }

        return list;
    }

    this.countryPaginationArray = () => {
        let list = [];
        let pagesize = Math.min(this.maxPageSize, this.totalCountryPages());
        let offset = Math.trunc((pagesize - 1) / 2);

        let left = this.currentCountryPage() - offset;
        let right = this.currentCountryPage() + offset;

        let newLeft = left > 1 ? left : 1;
        let newRight = right < this.totalCountryPages() ? right : this.totalCountryPages();

        for (let i = newLeft + newRight - right; i <= newRight + newLeft - left; i++) {
            list.push(i);
        }

        return list;
    }

    this.setCurrentTitlePage = page => {
        if (page) this.currentTitlePage(page);
    }

    this.nextTitlePage = () => {
        this.currentTitlePage(this.currentTitlePage() + 1);
    }

    this.prevTitlePage = () => {
        this.currentTitlePage(this.currentTitlePage() - 1);
    }

    this.setCurrentActorPage = page => {
        if (page) this.currentActorPage(page);
    }

    this.nextActorPage = () => {
        this.currentActorPage(this.currentActorPage() + 1);
    }

    this.prevActorPage = () => {
        this.currentActorPage(this.currentActorPage() - 1);
    }

    this.setCurrentCountryPage = page => {
        if (page) this.currentCountryPage(page);
    }

    this.nextCountryPage = () => {
        this.currentCountryPage(this.currentCountryPage() + 1);
    }

    this.prevCountryPage = () => {
        this.currentCountryPage(this.currentCountryPage() - 1);
    }

    this.showTitleModal = titleInfo => {
        this.currentTitleInfo(titleInfo);
        $("#titleInfoModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    this.showActorModal = actorInfo => {
        this.currentActorInfo(actorInfo);
        $("#actorInfoModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    this.showCountryModal = countryInfo => {
        this.currentCountryInfo(countryInfo);
        $("#countryInfoModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    this.bookmarkMovie = titleInfo => {
        this.bookmarkedTitles.push({...titleInfo, dateBookmarked: new Date().toDateString()});
    }

    this.isBookmarked = id => {
        let found = false
        this.bookmarkedTitles().forEach(val => {
           if (id === val["id"])
               found = true;
        });
        return found;
    }

    this.removeBookmark = item => {
        let bookmarks = this.bookmarkedTitles();
        let toRemove = bookmarks.find(val => (val["id"] === item["id"]));
        this.bookmarkedTitles.remove(toRemove);
    }
    this.deleteAllBookmarks = () => {
        this.bookmarkedTitles([]);
    }

    this.switchToTitleInfo = title => {
        this.closeAllModals();
        getTitleByID(title["id"], res => {
            this.showTitleModal(this.formatAPITitleResponse(res));
        }, this);
    }

    this.switchToActorInfo = actor => {
        this.closeAllModals();
        getActorByID(actor["id"], res => {
            this.showActorModal(this.formatAPIActorResponse(res));
        }, this);
    }

    this.switchToCountryInfo = country => {
        this.closeAllModals();
        getCountryByID(country["id"], res => {
            this.showCountryModal(this.formatAPIActorResponse(res));
        }, this);
    }

    this.deserialize = () => {
        const store = JSON.parse(localStorage.getItem("bookmarks"));
        if (store)
            this.bookmarkedTitles(store);
    }

    this.formatAPITitleResponse = response => ({
        actors: response["Actors"].map(val => ({ id: val["Id"], name: val["Name"] })),
        categories: response["Categories"].map(val => ({ id: val["Id"], name: val["Name"] })),
        countries: response["Countries"].map(val => ({ id: val["Id"], name: val["Name"] })),
        directors: response["Directors"].map(val => ({ id: val["Id"], name: val["Name"] })),
        name: response["Name"],
        added: response["DateAdded"],
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
    })

    this.formatAPIActorResponse = response => ({
        name: response["Name"],
        id: response["Id"],
        titles: response["Titles"].map(val => ({name: val["Name"], id: val["Id"]}))
    })

    this.formatAPICountryResponse = response => ({
        name: response["Name"],
        id: response["Id"],
        titles: response["Titles"].map(val => ({name: val["Name"], id: val["Id"]}))
    })

    this.titleQuery.subscribe(latest => {
        if (latest === "") {
            this.getTitlePage(this.currentTitlePage());
            return;
        }

        this.titleSearchResults([]);
        searchForTitles(latest, res => {
            res = res.slice(0, NUMBER_RECORDS);
            res.forEach(val => this.titleDetailedInfo(val["Id"]));
        }, this);
    }, this);

    this.actorQuery.subscribe(latest => {
        if (latest === "") {
            this.getActorPage(this.currentActorPage())
            return;
        }

        this.actorSearchResults([]);
        searchForActors(latest, res => {
            res = res.slice(0, NUMBER_RECORDS);
            res.forEach(val => this.actorDetailedInfo(val["Id"]));
        }, this);
    }, this);

    this.countryQuery.subscribe(latest => {
        if (latest === "") {
            this.getActorPage(this.currentCountryPage())
            return;
        }

        this.countrySearchResults([]);
        searchForCountries(latest, res => {
            res = res.slice(0, NUMBER_RECORDS);
            res.forEach(val => this.countryDetailedInfo(val["Id"]));
        }, this);
    }, this);

    this.currentTitlePage.subscribe(latest => this.getTitlePage(latest), this);

    this.currentActorPage.subscribe(latest => this.getActorPage(latest), this);

    this.currentCountryPage.subscribe(latest => this.getCountryPage(latest), this);

    this.bookmarkedTitles.subscribe(() => {
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarkedTitles()))
    }, this);

    this.closeAllModals = () => {
        $("#actorInfoModal").modal("hide");
        $("#countryInfoModal").modal("hide");
        $("#titleInfoModal").modal("hide");
    }

    // initialization
    this.getTitlePage(1);
    this.getActorPage(1);
    this.getCountryPage(1);
    this.deserialize();
}

ko.applyBindings(new ViewModel());