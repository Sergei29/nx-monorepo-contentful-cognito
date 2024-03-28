const SYS_FRAGMENT = `
    sys {
        id
    }
`;

const IMAGE_FRAGMENT = `
    image {
        ${SYS_FRAGMENT}
        title
        url
        width
        height
    }
`;

const RICH_TEXT_FIELDS = `
    json
    links {
        assets {
            block {
                ${SYS_FRAGMENT}
                url
                title
                description
                width
                height
            }
            hyperlink{
                ${SYS_FRAGMENT}
                url
                title
                description
                width
                height
            }
        }
    }
   
`;

export const getHeroItemsByPathname = (pathname: string) => `
    query {
        heroCollection( where: { pathname: "${pathname}" } ){
            items{
                ${SYS_FRAGMENT}
                title
                pathname
                text
                ${IMAGE_FRAGMENT}
            }
        }
    }
`;

export const getHeroItemsCollection = () => `
    query {
        heroCollection( where: { pathname_not: "home" } ){
            items{
                ${SYS_FRAGMENT}
                title
                pathname
                ${IMAGE_FRAGMENT}
            }
        }
    }
`;

export const getBooksCollection = () => `
    query {
        booksCollection {
            items {
                ${SYS_FRAGMENT}
                title
                author
                ${IMAGE_FRAGMENT}
            }
        }
    }
`;

export const getBooksIds = () => `
    query {
        booksCollection{
            items{
                ${SYS_FRAGMENT}
            }
        }
    }
`;

export const getBookById = (bookId: string) => `
    query {
        books( id: "${bookId}" ){
            ${SYS_FRAGMENT}
            title
            subTitle
            author
            about{
                ${RICH_TEXT_FIELDS}
            }
            ${IMAGE_FRAGMENT}
        }
    }
`;

export const getMoviesCollection = () => `
    query {
        moviesCollection{
            items{
                ${SYS_FRAGMENT}
                title
                subTitle
                ${IMAGE_FRAGMENT}
            }
        }
    }
`;

export const getMoviesIds = () => `
    query {
        moviesCollection{
            items{
                ${SYS_FRAGMENT}
            }
        }
    }
`;

export const getMovieById = (movieId: string) => `
    query {
        movies(id: "${movieId}") {
            ${SYS_FRAGMENT}
            title
            subTitle
            genre
            cast
            description{
                ${RICH_TEXT_FIELDS}
            }
            videoUrl
            ${IMAGE_FRAGMENT}
        }
    }
`;

export const getGamesCollection = () => `
    query {
        gamesCollection{
            items{
                ${SYS_FRAGMENT}
                title
                subTitle
                ${IMAGE_FRAGMENT}
            }
        }
    }
`;

export const getGamesIds = () => `
    query {
        gamesCollection{
            items{
                ${SYS_FRAGMENT}
            }
        }
    }
`;

export const getGameById = (gameId: string) => `
    query {
        games( id: "${gameId}" ) {
            ${SYS_FRAGMENT}
            title
            subTitle
            genre
            videoUrl
            description {
                ${RICH_TEXT_FIELDS}
            }
            ${IMAGE_FRAGMENT}
        }
    }
`;

export const getHeroBackgroundImage = (assetId: string) => `
    query {
        asset(id: "${assetId}"){
            title
            url
        }
    }
`;
