const Bookmark = ({status, onBookmark, id}) => {
    return (
        <button onClick={()=>onBookmark(id)}>
            {status ? <i className="bi bi-bookmark-fill"></i> : <i className="bi bi-bookmark"></i>}
            
        </button>
    )
}

export default Bookmark