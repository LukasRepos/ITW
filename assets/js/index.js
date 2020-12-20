function ViewModel() {
    const NUMBER_RECORDS = 20;
    const PAGESIZE = 20;

    this.maxPageSize = 11;

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
        titles: ""
    });

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

    this.showTitleModal = titleInfo => {
        this.currentTitleInfo(titleInfo);
        $("#titleInfoModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    this.showActorModal = titleInfo => {
        this.currentActorInfo(titleInfo);
        $("#actorInfoModal").modal({
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
        $("#actorInfoModal").modal("hide");
        getTitleByID(title["id"], res => {
            this.showTitleModal(this.formatAPITitleResponse(res));
        }, this);
    }

    this.switchToActorInfo = title => {
        $("#titleInfoModal").modal("hide");
        getActorByID(title["id"], res => {
            this.showActorModal(this.formatAPIActorResponse(res));
        }, this);
    }

    this.deserialize = () => {
        this.bookmarkedTitles(JSON.parse(localStorage.getItem("bookmarks")))
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

    this.currentTitlePage.subscribe(latest => this.getTitlePage(latest), this);

    this.currentActorPage.subscribe(latest => this.getActorPage(latest), this);

    this.bookmarkedTitles.subscribe(() => {
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarkedTitles()))
    }, this)

    // initialization
    this.getTitlePage(1);
    this.getActorPage(1);
    this.deserialize();
}

ko.applyBindings(new ViewModel());