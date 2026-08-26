export const AppConstant = {
    API_BASE_URL: 'https://api.example.com/api',
    getActorList: '/actors',
    getFilmList: '/films',
    addActor: '/actors/add',
    addFilm: '/films/add',
    getFilmById: '/films/:id', // Append film ID to this endpoint
    getActorById: '/actors/:id', // Append actor ID to this endpoint
    updateActor: '/actors/update/:id', // Append actor ID to this endpoint
    updateFilm: '/films/update/:id', // Append film ID to this endpoint
    deleteActor: '/actors/delete/:id', // Append actor ID to this endpoint
    deleteFilm: '/films/delete/:id', // Append film ID to this endpoint
};