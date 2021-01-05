function sendApiRequest(uri, callback, data={}) {
    $.ajax({
        url: `http://192.168.160.58/netflix/api/${uri}`,
        type: "GET",
        data: data,
        dataType: "json",
        success: result => {
            callback(result);
        },
        error: (_, status, err) => {
            /*console.error("App request failed with status " + status);
            console.error(err);
            console.trace();*/
        }
    });
}

// region Get by ID
function getActorByID(id, callback, context) {
    const uri = `Actors/${id}`;
    sendApiRequest(uri, callback.bind(context));
}

function getCategoryByID(id, callback, context) {
    const uri = `Categories/${id}`;
    sendApiRequest(uri, callback.bind(context));
}

function getCountryByID(id, callback, context) {
    const uri = `Countries/${id}`;
    sendApiRequest(uri, callback.bind(context));
}

function getDirectorByID(id, callback, context) {
    const uri = `Directors/${id}`;
    sendApiRequest(uri, callback.bind(context));
}

function getRatingByID(id, callback, context) {
    const uri = `Ratings/${id}`;
    sendApiRequest(uri, callback.bind(context));
}

function getTitleByID(id, callback, context) {
    const uri = `Titles/${id}`;
    sendApiRequest(uri, callback.bind(context));
}
// endregion
// region Search
function searchForActors(query, callback, context) {
    const uri = "Search/Actors";
    const data = {name: query};
    sendApiRequest(uri, callback.bind(context), data);
}

function searchForCategories(query, callback, context) {
    const uri = "Search/Categories";
    const data = {name: query};
    sendApiRequest(uri, callback.bind(context), data);
}

function searchForCountries(query, callback, context) {
    const uri = "Search/Countries";
    const data = {name: query};
    sendApiRequest(uri, callback.bind(context), data);
}

function searchForDirectors(query, callback, context) {
    const uri = "Search/Directors";
    const data = {name: query};
    sendApiRequest(uri, callback.bind(context), data);
}

function searchForTitles(query, callback, context) {
    const uri = "Search/Titles";
    const data = {name: query};
    sendApiRequest(uri, callback.bind(context), data);
}

function searchForSeries(query, callback, context) {
    const uri = "Search/Series";
    const data = {name: query};
    sendApiRequest(uri, callback.bind(context), data);
}
// endregion
// region Statistics
function getAPIStatistics(callback, context) {
    const uri = "Statistics";
    sendApiRequest(uri, callback.bind(context));
}
// endregion
// region Pagination
function getActorsPage(page, pageSize, callback, context) {
    const uri = "Actors";
    const data = {
        page: page,
        pagesize: pageSize
    }
    sendApiRequest(uri, callback.bind(context), data);
}

function getCategoriesPage(page, pageSize, callback, context) {
    const uri = "Categories";
    const data = {
        page: page,
        pagesize: pageSize
    }
    sendApiRequest(uri, callback.bind(context), data);
}

function getCountriesPage(page, pageSize, callback, context) {
    const uri = "Countries";
    const data = {
        page: page,
        pagesize: pageSize
    }
    sendApiRequest(uri, callback.bind(context), data);
}

function getDirectorsPage(page, pageSize, callback, context) {
    const uri = "Directors";
    const data = {
        page: page,
        pagesize: pageSize
    }
    sendApiRequest(uri, callback.bind(context), data);
}

function getTitlesPage(page, pageSize, callback, context) {
    const uri = "Titles";
    const data = {
        page: page,
        pagesize: pageSize
    }
    sendApiRequest(uri, callback.bind(context), data);
}
// endregion
// region Types
function getTitleTypes(callback, context) {
    const uri = "TitleTypes";
    sendApiRequest(uri, callback.bind(context));
}

function getRatings(callback, context) {
    const uri = "Ratings";
    sendApiRequest(uri, callback.bind(context));
}
// endregion