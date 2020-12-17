export function getActorsByID(id) {
    let res = null;
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/Actors/${id}`,
        type: "GET",
        dataType: "json",
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

export function getCategoriesByID(id) {
    let res = null;
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/Categories/${id}`,
        type: "GET",
        dataType: "json",
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

export function getCountriesByID(id) {
    let res = null;
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/Countries/${id}`,
        type: "GET",
        dataType: "json",
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

export function getDirectorsByID(id) {
    let res = null;
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/Directors/${id}`,
        type: "GET",
        dataType: "json",
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

export function getRatingsByID(id) {
    let res = null;
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/Ratings/${id}`,
        type: "GET",
        dataType: "json",
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

export function getTitlesByID(id) {
    let res = null;
    $.ajax({
        url: `http://192.168.160.58/netflix/api/Search/Titles/${id}`,
        type: "GET",
        dataType: "json",
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
