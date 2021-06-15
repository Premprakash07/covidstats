import React from 'react'
import InfoCard from '../InfoCard'

function Totalcount(props) {
    return (
        <div className="count-info">
            <InfoCard title='Total Cases' cname='total-cases' count={props.countryInfo.cases} />
            <InfoCard title='Active Cases' cname='active-cases' count={props.countryInfo.active} />
            <InfoCard title='Recovered' cname='recovered' count={props.countryInfo.recovered} />
            <InfoCard title='Deaths' cname='deaths' count={props.countryInfo.deaths} />
        </div>
    )
}

export default Totalcount
