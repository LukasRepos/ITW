function sendApiRequest(uri, data={}) {
    let res = null;
    $.ajax({
        url: `http://192.168.160.58/netflix/api/${uri}`,
        type: "GET",
        data: data,
        dataType: "json",
        async: false,
        success: result => {
            res = result;
        },
        error: (_, status, err) => {
            console.error("App request failed with status " + status);
            console.error(err);
        }
    });
    return res;
}

// region By ID requests
function getActorsByID(id) {
    let uri = `Actors/${id}`;
    return sendApiRequest(uri);
}

function getCategoriesByID(id) {
    let uri = `Categories/${id}`;
    return sendApiRequest(uri);
}

function getCountriesByID(id) {
    let uri = `Countries/${id}`;
    return sendApiRequest(uri);
}

function getDirectorsByID(id) {
    let uri = `Directors/${id}`;
    return sendApiRequest(uri);
}

function getRatingsByID(id) {
    let uri = `Ratings/${id}`;
    return sendApiRequest(uri);
}

function getTitlesByID(id) {
    let uri = `Titles/${id}`;
    return sendApiRequest(uri);
}
// endregion
// region Search requests
function searchForActors(query) {
    let uri = "Search/Actors";
    let data = {name: query};
    return sendApiRequest(uri, data);
}

function searchForCategories(query) {
    let uri = "Search/Categories";
    let data = {name: query};
    return sendApiRequest(uri, data);
}

function searchForCountries(query) {
    let uri = "Search/Countries";
    let data = {name: query};
    return sendApiRequest(uri, data);
}

function searchForDirectors(query) {
    let uri = "Search/Directors";
    let data = {name: query};
    return sendApiRequest(uri, data);
}

function searchForTitles(query) {
    let uri = "Search/Titles";
    let data = {name: query};
    return sendApiRequest(uri, data);
}
// endregion