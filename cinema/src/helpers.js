const fullImageUrl = (backdropPath, width = 'w500') => {
    return `https://image.tmdb.org/t/p/${width}/${backdropPath}`
}


export {fullImageUrl};