import React from 'react'
import InfoCard from '../InfoCard'

function Today(props) {
    return (
        <div className="count-info">
            <InfoCard title='New Cases' cname='total-cases' count={props.countryInfo.todayCases} />
            <InfoCard title='Recovered' cname='recovered' count={props.countryInfo.todayRecovered} />
            <InfoCard title='Deaths' cname='deaths' count={props.countryInfo.todayDeaths} />
        </div>
    )
}

export default Today
