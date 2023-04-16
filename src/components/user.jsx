import Bookmark from "./bookmark"
import Qualitie from "./qualitie"

const User = ({_id, name, qualities, profession, completedMeetings, rate, onBookMark, bookmark, onDelete}) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            {qualities.map((qualities)=>(
                <Qualitie key={qualities._id} {...qualities} />
            ))}
            <td key={profession._id}>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>{<Bookmark id={_id} onBookmark={onBookMark} status={bookmark}/>}</td>
            <td><button type="button" className="btn btn-danger" onClick={()=>onDelete(_id)}>delete</button></td>
        </tr>
    )
}

export default User