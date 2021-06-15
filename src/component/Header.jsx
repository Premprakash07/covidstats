import React from 'react'
import '../css/header.css'

function Header() {
    return (
        <div id='header' className='section'>
            <div className="nav">
                <a href="/"><h2>COVIDSTATS</h2></a>
                <ul className="nav-items">
                    <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target='blank'>
                        <li>WHO</li>
                    </a>
                    <a href="https://www.mygov.in/covid-19/" target='blank'>
                        <li>mygov.in</li>
                    </a>
                    <a href="https://www.mygov.in/covid-19/" target='blank'>
                        <li>Help</li>
                    </a>
                    <a href="https://www.mygov.in/covid-19/" target='blank'>
                        <li>Help</li>
                    </a>
                </ul>
            </div>
        </div>
    )
}

export default Header
