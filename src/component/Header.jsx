import React, { useState } from 'react'
import '../css/header.css'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

function Header() {

    const [collapsestyle, setcollapsestyle ] = useState(false)

    const navCollapse = () => {
        setcollapsestyle(!collapsestyle)
    }

    return (
        <div id='header' className='section'>
            <div className="nav">
                <a href="/"><h2>COVIDSTATS</h2></a>
                <ul className={collapsestyle ? "nav-items nav-toggle" : 'nav-items'}>
                    <div className="close-nav" onClick={navCollapse}><CloseIcon /></div>
                    <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target='blank'>
                        <li>WHO</li>
                    </a>
                    <a href="https://www.mygov.in/covid-19/" target='blank'>
                        <li>mygov.in</li>
                    </a>
                    <a href="https://www.who.int/news-room" target='blank'>
                        <li>News</li>
                    </a>
                    <a href="https://www.mygov.in/covid-19/" target='blank'>
                        <li>About the disease</li>
                    </a>
                    <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub" target='blank'>
                        <li>FAQs</li>
                    </a>
                    <a href="localhost:3000" target='blank'>
                        <li>FAQs</li>
                    </a>
                </ul>
                <div className="nav-icon" onClick={navCollapse}><MenuIcon style={{fontSize: 'inherit'}} /></div>
                
            </div>
        </div>
    )
}

export default Header
