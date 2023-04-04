import React, { useState } from "react";
import api from '../api'

const Users=()=>{
    const [users, setUsers] = useState(api.users.fetchAll())
    
    const handleDelete = (userId) => {
        setUsers((prevState)=>prevState.filter((users)=>users!==userId))
    }

    const renderPhrase = (number) => {
        if ((number === 2) || (number === 3) || (number === 4)) {
            return (<h1 className="badge bg-primary">{number} человека тусанет с тобой сегодня</h1>)
        } else if (number === 0) {
            return (<h1 className="badge bg-danger">никто с тобой не тусанет</h1>)
        } else {
            return (<h1 className="badge bg-primary">{number} человек тусанет с тобой сегодня</h1>)
        }
    }
    return (
        <>  
            {renderPhrase(users.length)}      
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>                   
                    {users.map((item)=>(
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            {item.qualities.map((id)=>(
                                <td key={id._id} className={'mx-1 badge bg-'+id.color}>{id.name}</td>
                            ))}
                            <td key={item.profession._id}>{item.profession.name}</td>
                            <td>{item.completedMeetings}</td>
                            <td>{item.rate}/5</td>
                            <td><button type="button" className="btn btn-danger" onClick={()=>handleDelete(item)}>delete</button></td>
                        </tr>
                    ))}                    
                </tbody>
            </table>
        </>
    )
};

export default Users;