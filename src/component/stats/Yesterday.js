import React from 'react'
import InfoCard from '../InfoCard'

function Yesterday(props) {
    return (
        <div className="count-info">
            <InfoCard title='New Cases' cname='total-cases' count={props.yesterdaydata.Cases} />
            <InfoCard title='Recovered' cname='recovered' count={props.yesterdaydata.Recovered} />
            <InfoCard title='Deaths' cname='deaths' count={props.yesterdaydata.Deaths} />
        </div>
    )
}

export default Yesterday
