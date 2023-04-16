const SearchStatus = ({length}) => {    
    if ((length === 2) || (length === 3) || (length === 4)) {
        return (<h1 className="badge bg-primary">{length} человека тусанет с тобой сегодня</h1>)
    } else if (length === 0) {
        return (<h1 className="badge bg-danger">никто с тобой не тусанет</h1>)
    } else {
        return (<h1 className="badge bg-primary">{length} человек тусанет с тобой сегодня</h1>)
    }
}

export default SearchStatus