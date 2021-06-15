import React from 'react'
import '../css/infocard.css'

function InfoCard(props) {

    return (
            <div className={"info " + props.cname}>
            <h4>{props.title}</h4>
            <span>{Number(props.count).toLocaleString('en-US')}</span>
    </div>
    )
}

export default InfoCard
