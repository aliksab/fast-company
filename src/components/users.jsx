import { useState } from "react";
import api from '../api'
import User from "./user";
import SearchStatus from "./searchStatus";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prev)=>prev.filter((users)=>users._id!==userId))
    }
    const handleToggleBookMark = (userId) => {
        setUsers((prev) => prev.map((user)=> user._id === userId ? {...user, bookmark: !user.bookmark} : user))
    }
    
    return(
        <> 
            <SearchStatus length={users.length} />
            {users.length > 0 && (
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user)=>(
                        <User key={user._id} onDelete={handleDelete} onBookMark={handleToggleBookMark} {...user} />
                    ))}   
                </tbody>
            </table>
            )}            
        </>        
    )
}

export default Users