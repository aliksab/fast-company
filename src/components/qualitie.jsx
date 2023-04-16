const Qualitie = (props) => {
    return(
        <td key={props._id} className={'mx-1 badge bg-'+props.color}>{props.name}</td>        
    )    
}

export default Qualitie