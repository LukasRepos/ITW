function ViewModel() {
    const NUMBER_RECORDS = 21;
    const PAGESIZE = 21;
    const CHARTID = "statisticsChart"

    this.maxPageSize = ko.observable(11);
    let statisticsChart = null;

    this.test = ko.observableArray();
    this.test.subscribe(val => console.log(val));

    this.customSearchCountryVisible = ko.observable(false);
    this.customSearchCategoryVisible = ko.observable(false);
    this.customSearchActorVisible = ko.observable(false);

    this.customSearchTitleError = ko.observable(false);
    this.customSearchCountryError = ko.observable(false);
    this.customSearchCategoryError = ko.observable(false);
    this.customSearchActorError = ko.observable(false);

    this.customSearchValidated = ko.observable(false);

    this.customSearchIsSearchingTitles = ko.observable(false);
    this.customSearchNoResults = ko.observable(false);

    this.customSearchResults = ko.observableArray();
    this.customSearchTitle = ko.observable("");
    this.customSearchCountry = ko.observable("");
    this.customSearchCategory = ko.observable("");
    this.customSearchActor = ko.observable("");

    this.currentTitlePage = ko.observable(1);
    this.totalTitlePages = ko.observable(1);
    this.titleImageUrls = ko.observable();
    this.titleSearchResults = ko.observableArray();
    this.titleQuery = ko.observable();
    this.titleRecordCount = ko.observable(NUMBER_RECORDS);
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
    this.actorRecordCount = ko.observable(NUMBER_RECORDS);
    this.currentActorInfo = ko.observable({
        name: "",
        id: "",
        titles: []
    });

    this.directorSearchResults = ko.observableArray();
    this.directorQuery = ko.observable();
    this.currentDirectorPage = ko.observable(1);
    this.totalDirectorPages = ko.observable(1);
    this.directorRecordCount = ko.observable(NUMBER_RECORDS);
    this.currentDirectorInfo = ko.observable({
        name: "",
        id: "",
        titles: []
    });

    this.directorSearchResults = ko.observableArray();
    this.directorQuery = ko.observable();

    this.countrySearchResults = ko.observableArray();
    this.countryQuery = ko.observable();
    this.currentCountryPage = ko.observable(1);
    this.totalCountryPages = ko.observable(1);
    this.countryRecordCount = ko.observable(NUMBER_RECORDS);
    this.currentCountryInfo = ko.observable({
        name: "",
        id: "",
        titles: []
    });

    this.categorySearchResults = ko.observableArray();
    this.categoryQuery = ko.observable();
    this.currentCategoryPage = ko.observable(1);
    this.totalCategoryPages = ko.observable(1);
    this.categoryRecordCount = ko.observable(NUMBER_RECORDS);
    this.currentCategoryInfo = ko.observable({
        name: "",
        id: "",
        titles: []
    });

    this.ratings = ko.observableArray();
    this.currentRatingInfo = ko.observable({
        id: "",
        code: "",
        "class": "",
        "desc": "",
        titles: []
    });

    this.statisticsOptions = ko.observable();

    this.performSearch = () => {
        this.customSearchValidated(this.validateSearch());
        if (!this.customSearchValidated()) {
            this.customSearchResults([]);
            return;
        }

        // reset the error flags
        this.customSearchTitleError(false);
        this.customSearchCountryError(false);
        this.customSearchCategoryError(false);
        this.customSearchActorError(false);

        this.customSearchResults([]);
        if (this.customSearchIsSearchingTitles())
            this.customSearchForTitles();
        else
            this.customSearchForSeries();
    }

    this.customSearchForTitles = () => {
        searchForTitles(this.customSearchTitle(), res => {
            res.forEach(val => getTitleByID(val["Id"], title => {
                let inCountries = title["Countries"].map(count => count["Name"]).includes(this.customSearchCountry());
                let inCategories = title["Categories"].map(cat => cat["Name"]).includes(this.customSearchCategory());
                let inActors = title["Actors"].map(act => act["Name"]).includes(this.customSearchActor());

                let toAdd = true;

                if (!inCountries && this.customSearchCountryVisible())
                    toAdd = false;
                if (!inCategories && this.customSearchCategoryVisible())
                    toAdd = false;
                if (!inActors && this.customSearchActorVisible())
                    toAdd = false;

                if (toAdd)
                    this.customSearchResults.push(formatAPITitleResponse(title));
            }, this));
        }, this);
    }

    this.customSearchForSeries = () => {
        searchForSeries(this.customSearchTitle(), res => {
            res.forEach(val => getTitleByID(val["Id"], title => {
                let inCountries = title["Countries"].map(count => count["Name"]).includes(this.customSearchCountry());
                let inCategories = title["Categories"].map(cat => cat["Name"]).includes(this.customSearchCategory());
                let inActors = title["Actors"].map(act => act["Name"]).includes(this.customSearchActor());

                let toAdd = true;

                if (!inCountries && this.customSearchCountryVisible())
                    toAdd = false;
                if (!inCategories && this.customSearchCategoryVisible())
                    toAdd = false;
                if (!inActors && this.customSearchActorVisible())
                    toAdd = false;

                if (toAdd)
                    this.customSearchResults.push(formatAPITitleResponse(title));
            }, this));
        }, this);
    }

    this.customSearchResults.subscribe(val => {
        if (this.customSearchResults().length === 0 && this.customSearchValidated()) {
            this.customSearchNoResults(true);
        } else {
            this.customSearchNoResults(false);
        }
    })

    this.titleDetailedInfo = id => {
        getTitleByID(id, res => {
            this.titleSearchResults.push(formatAPITitleResponse(res));
        }, this);
    }

    this.actorDetailedInfo = id => {
        getActorByID(id, res => {
            this.actorSearchResults.push(formatAPIActorResponse(res));
        }, this);
    }

    this.countryDetailedInfo = id => {
        getCountryByID(id, res => {
            this.countrySearchResults.push(formatAPICountryResponse(res));
        }, this);
    }

    this.directorDetailedInfo = id => {
        getDirectorByID(id, res => {
            this.directorSearchResults.push(formatAPIDirectorResponse(res));
        }, this);
    }

    this.categoryDetailedInfo = id => {
        getCategoryByID(id, res => {
            this.categorySearchResults.push(formatAPICategoryResponse(res));
        }, this);
    }

    this.directorDetailedInfo = id => {
        getDirectorByID(id, res => {
            this.directorSearchResults.push(formatAPIDirectorResponse(res));
        }, this);
    }

    this.getTitlePage = page => {
        this.titleSearchResults([]);
        getTitlesPage(page, PAGESIZE, res => {
            this.totalTitlePages(res["TotalPages"]);
            res["Titles"].forEach(val => this.titleDetailedInfo(val["Id"]));
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

    this.getDirectorPage = page => {
        this.directorSearchResults([]);
        getDirectorsPage(page, PAGESIZE, res => {
            this.totalDirectorPages(res["TotalPages"]);
            res["Directors"].forEach(val => this.directorDetailedInfo(val["Id"]));
        }, this);
    }

    this.getCategoryPage = page => {
        this.categorySearchResults([]);
        getCategoriesPage(page, PAGESIZE, res => {
            this.totalCategoryPages(res["TotalPages"]);
            res["Categories"].forEach(val => this.categoryDetailedInfo(val["Id"]));
        }, this);
    }

    this.fetchRatings = () => {
        this.ratings([]);
        getRatings(res => {
            res.forEach(val => getRatingByID(val["Id"], rating => {
                this.ratings.push(formatAPIRatingResponse(rating));
            }, this));
        }, this);
    }

    this.titlePaginationArray = () => {
        let list = [];
        let pagesize = Math.min(this.maxPageSize(), this.totalTitlePages());
        let offset = Math.trunc((pagesize - 1) / 2);

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
        let pagesize = Math.min(this.maxPageSize(), this.totalActorPages());
        let offset = Math.trunc((pagesize - 1) / 2);

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
        let pagesize = Math.min(this.maxPageSize(), this.totalCountryPages());
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

    this.directorPaginationArray = () => {
        let list = [];
        let pagesize = Math.min(this.maxPageSize(), this.totalDirectorPages());
        let offset = Math.trunc((pagesize - 1) / 2);

        let left = this.currentDirectorPage() - offset;
        let right = this.currentDirectorPage() + offset;

        let newLeft = left > 1 ? left : 1;
        let newRight = right < this.totalDirectorPages() ? right : this.totalDirectorPages();

        for (let i = newLeft + newRight - right; i <= newRight + newLeft - left; i++) {
            list.push(i);
        }

        return list;
    }

    this.categoryPaginationArray = () => {
        let list = [];
        let pagesize = Math.min(this.maxPageSize(), this.totalCategoryPages());
        let offset = Math.trunc((pagesize - 1) / 2);

        let left = this.currentCategoryPage() - offset;
        let right = this.currentCategoryPage() + offset;

        let newLeft = left > 1 ? left : 1;
        let newRight = right < this.totalCategoryPages() ? right : this.totalCategoryPages();

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

    this.setCurrentDirectorPage = page => {
        if (page) this.currentDirectorPage(page);
    }

    this.nextDirectorPage = () => {
        this.currentDirectorPage(this.currentDirectorPage() + 1);
    }

    this.prevDirectorPage = () => {
        this.currentDirectorPage(this.currentDirectorPage() - 1);
    }

    this.setCurrentCategoryPage = page => {
        if (page) this.currentCategoryPage(page);
    }

    this.nextCategoryPage = () => {
        this.currentCategoryPage(this.currentCategoryPage() + 1);
    }

    this.prevCategoryPage = () => {
        this.currentCategoryPage(this.currentCategoryPage() - 1);
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

    this.showRatingModal = ratingInfo => {
        this.currentRatingInfo(ratingInfo);
        $("#ratingInfoModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    this.showDirectorModal = directorInfo => {
        this.currentDirectorInfo(directorInfo);
        $("#directorInfoModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    this.showCategoryModal = categoryInfo => {
        this.currentCategoryInfo(categoryInfo);
        $("#categoryInfoModal").modal({
            backdrop: "static",
            keyboard: false
        });
    }

    this.bookmarkMovie = titleInfo => {
        this.bookmarkedTitles.push({...titleInfo, dateBookmarked: new Date().toLocaleDateString()});
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
            this.showTitleModal(formatAPITitleResponse(res));
        }, this);
    }

    this.switchToActorInfo = actor => {
        this.closeAllModals();
        getActorByID(actor["id"], res => {
            this.showActorModal(formatAPIActorResponse(res));
        }, this);
    }

    this.switchToCountryInfo = country => {
        this.closeAllModals();
        getCountryByID(country["id"], res => {
            this.showCountryModal(formatAPICountryResponse(res));
        }, this);
    }

    this.switchToRatingInfo = rating => {
        this.closeAllModals();
        getRatingByID(rating["id"], res => {
            this.showRatingModal(formatAPIRatingResponse(res));
        }, this);
    }

    this.switchToDirectorInfo = country => {
        this.closeAllModals();
        getDirectorByID(country["id"], res => {
            this.showDirectorModal(formatAPIDirectorResponse(res));
        }, this);
    }

    this.switchToCategoryInfo = category => {
        this.closeAllModals();
        getCategoryByID(category["id"], res => {
            this.showCategoryModal(formatAPICategoryResponse(res));
        }, this);
    }

    this.closeAllModals = () => {
        $("#actorInfoModal").modal("hide");
        $("#countryInfoModal").modal("hide");
        $("#titleInfoModal").modal("hide");
        $("#ratingInfoModal").modal("hide");
        $("#directorInfoModal").modal("hide");
        $("#categoryInfoModal").modal("hide");
    }

    this.titleQuery.subscribe(latest => {
        if (latest === "") {
            this.getTitlePage(this.currentTitlePage());
            return;
        }

        this.titleSearchResults([]);
        searchForTitles(latest, res => {
            res = res.slice(0, this.titleRecordCount());
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
            res = res.slice(0, this.actorRecordCount());
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
            res = res.slice(0, this.countryRecordCount());
            res.forEach(val => this.countryDetailedInfo(val["Id"]));
        }, this);
    }, this);

    this.directorQuery.subscribe(latest => {
        if (latest === "") {
            this.getDirectorPage(this.currentDirectorPage())
            return;
        }

        this.directorSearchResults([]);
        searchForDirectors(latest, res => {
            res = res.slice(0, this.directorRecordCount());
            res.forEach(val => this.directorDetailedInfo(val["Id"]));
        }, this);
    }, this);

    this.categoryQuery.subscribe(latest => {
        if (latest === "") {
            this.getCategoryPage(this.currentCategoryPage())
            return;
        }

        this.categorySearchResults([]);
        searchForCategories(latest, res => {
            res = res.slice(0, this.categoryRecordCount());
            res.forEach(val => this.categoryDetailedInfo(val["Id"]));
        }, this);
    }, this);

    this.directorQuery.subscribe(latest => {
        if (latest === "") {
            // this.getActorPage(this.currentActorPage())
            return;
        }

        this.directorSearchResults([]);
        searchForDirectors(latest, res => {
            res = res.slice(0, NUMBER_RECORDS);
            res.forEach(val => this.directorDetailedInfo(val["Id"]));
        }, this);
    }, this);

    this.currentTitlePage.subscribe(latest => this.getTitlePage(latest), this);

    this.currentActorPage.subscribe(latest => this.getActorPage(latest), this);

    this.currentCountryPage.subscribe(latest => this.getCountryPage(latest), this);

    this.currentDirectorPage.subscribe(latest => this.getDirectorPage(latest), this);

    this.currentCategoryPage.subscribe(latest => this.getCategoryPage(latest), this);

    this.bookmarkedTitles.subscribe(() => {
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarkedTitles()));
    }, this);

    this.statisticsOptions.subscribe(latest => {
        switch (latest) {
            case "0":
                this.generateGeneralStatistics();
                break;
            case "1":
                this.generateTypeStatistics();
                break;
        }
    });

    this.generateGeneralStatistics = () => {
        getAPIStatistics(res => {
            const data = {
                labels: ["Atores", "Categorias", "Paises", "Diretores", "Filmes"],
                datasets: [{
                    label: "My First Dataset",
                    data: [res["Actors"], res["Categories"], res["Countries"], res["Directors"], res["Titles"]],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(48, 107, 52)",
                        "rgb(53, 59, 60)",
                        "rgb(210, 215, 223)"
                    ]
                }]
            };

            if (statisticsChart) {
                statisticsChart["chart"]["data"] = data;
                statisticsChart.update();
            } else {
                statisticsChart = createChart(CHARTID, data);
            }
        }, this);
    }

    this.generateTypeStatistics = () => {
        getTitleTypes(res => {
            console.log(res);
            const data = {
                labels: ["Filme", "TV Show"],
                datasets: [{
                    label: "My First Dataset",
                    data: [res[0]["Titles"], res[1]["Titles"]],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)"
                    ]
                }]
            };

            if (statisticsChart) {
                statisticsChart["chart"]["data"] = data;
                statisticsChart.update();
            } else {
                statisticsChart = createChart(CHARTID, data);
            }
        }, this);
    }

    this.deserialize = () => {
        const store = JSON.parse(localStorage.getItem("bookmarks"));
        if (store)
            this.bookmarkedTitles(store);
    }

    this.validateSearch = () => {
        let res = true;

        if (this.customSearchTitle().trim().length === 0) {
            res = false;
            this.customSearchTitleError(true);
        } else {
            this.customSearchTitleError(false);
        }

        if (this.customSearchCountryVisible() && this.customSearchCountry().trim().length === 0) {
            res = false;
            this.customSearchCountryError(true);
        } else {
            this.customSearchCountryError(false);
        }

        if (this.customSearchCategoryVisible() && this.customSearchCategory().trim().length === 0) {
            res = false;
            this.customSearchCategoryError(true);
        } else {
            this.customSearchCategoryError(false);
        }

        if (this.customSearchActorVisible() && this.customSearchActor().trim().length === 0) {
            res = false;
            this.customSearchActorError(true);
        } else {
            this.customSearchActorError(false);
        }

        return res;
    }

    this.customSearchSwitchToTitles = () => {
        $("#customSearchTitleDropdown").text("Filmes e Séries");
        this.customSearchIsSearchingTitles(true);
    }

    this.customSearchSwitchToSeries = () => {
        $("#customSearchTitleDropdown").text("Séries");
        this.customSearchIsSearchingTitles(false);
    }

    this.loadImages = function (res) {
        this.titleImageUrls(res);
    }

    this.getUrl = title => {
        if (this.titleImageUrls() && this.titleImageUrls()[title["id"].toString()])
            return this.titleImageUrls()[title["id"].toString()];
        return "./assets/images/NotFound.png"
    }

    // initialization
    this.getTitlePage(1);
    this.getActorPage(1);
    this.getCountryPage(1);
    this.getDirectorPage(1);
    this.getCategoryPage(1);
    this.fetchRatings();
    this.deserialize();
    loadImageUrls(this.loadImages, this);

    // window resizing algorithm
    const vw = $(window).width();
    this.maxPageSize(Math.trunc(vw / 60));
    window.addEventListener('resize', ((event) => {
        const vw = $(window).width();
        this.maxPageSize(Math.trunc(vw / 60));
    }).bind(this));

    // bootstrap hack to get modals to work
    $('body').on('hidden.bs.modal', function () {
        if ($('.modal.show').length > 0) {
            $('body').addClass('modal-open');
        }
    });
}

ko.applyBindings(new ViewModel());