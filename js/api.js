let BASE_URL = "https://api.football-data.org/v2/"
let API_KEY = "57203206caad4aec886fdeeafe631c64"



// Membuat Fungsi requestApi untuk menghindari penulisan fetch berulang
let requestApi = function(url) {
    return fetch(url, {
        "headers": {
            "X-Auth-Token": API_KEY
        }
    })
    .then(response => {
        if (response.status !== 200) {
            return Promise.reject(new Error(`Terjadi Keslahan: ${new Error(response.statusText)}`));
        } else if (response.status === 200) {
            return Promise.resolve(response);
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.log(error);
    });
}


// fungsi me-request data liga
function getLeague() {
    requestApi(`${BASE_URL}competitions?plan=TIER_ONE&areas=2077`)
    .then(data => {
        setCompetitionData(data);
    });
}

// fungsi me-request detail liga berdasarkan id url
function getLeagueId() {
    // ambil url
    let url = new URLSearchParams(window.location.search);
    // cari parameter berdasarkan id
    let id = url.get("id");

    // request jadwal
    requestApi(`${BASE_URL}competitions/${id}/matches?status=SCHEDULED`)
    .then(data => {
        setCompetitionMatch(data);
    });

    // request klasemen
    requestApi(`${BASE_URL}competitions/${id}/standings`)
    .then(data => {
        setCompetitionDataId(data);
    });

    // request top score
    requestApi(`${BASE_URL}competitions/${id}/scorers`)
    .then(data => {
        setScoresCompetition(data);
    })
}

// fungsi me-request detail team berdasarkan id url
function getTeam() {
    let url = new URLSearchParams(window.location.search);
    let id = url.get("id");

    requestApi(`${BASE_URL}teams/${id}`)
    .then(data => {
        setTeam(data);
    });
}