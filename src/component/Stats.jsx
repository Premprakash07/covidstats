import React, {useState, useEffect} from 'react'
import '../css/stats.css'
import Selectcountry from './stats/Selectcountry'
import Today from './stats/Today'
import Totalcount from './stats/Totalcount'
import Yesterday from './stats/Yesterday'
import Chart from './Chart'

function Stats() {

    const [countries, setCountries] = useState([]) //set the countries in the select options
    const [countryvalue, changecountry] = useState('wrldwide') // set the value of the select(country) field
    const [countryInfo, setcountryInfo] = useState({}) //set the country info tp display the total and today report
    const [yesterdaydata, setyesterdaydata] = useState({}) //set data fo the yesterday
    const [chartdata, setchartdata] = useState({})

    //set the country info for world on first load
    useEffect(() => {

        // for total data and todays data
        fetch('https://api.caw.sh/v3/covid-19/all')
        .then((response) => (response.json()))
        .then((data) => {
            setcountryInfo(data);
        })

        // for yesterday data
        fetch('https://api.caw.sh/v3/covid-19/historical/all?lastdays=2')
        .then(response => response.json())
        .then(data => {
            const yesterday = {
                'Cases': Object.values(data['cases'])[1] - Object.values(data['cases'])[0],
                'Deaths': Object.values(data['deaths'])[1] - Object.values(data['deaths'])[0],
                'Recovered': Object.values(data['recovered'])[1] - Object.values(data['recovered'])[0]
            }
            setyesterdaydata(yesterday)
        })

        const fetch_chartdata = async () => {
            await fetch('https://api.caw.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
    
                var newchartdata = []
                var lastdata
                for(var casedata in data.cases){
                    if(lastdata){
                        var newdatapoint = {
                            x: casedata,
                            cases: data.cases[casedata] - lastdata
                        }
                        newchartdata.push(newdatapoint)
                    }
                    lastdata = data.cases[casedata]
                }
                setchartdata(newchartdata);
            })}
            fetch_chartdata()

    }, [])

    //collect the data to get all the countries in the world
    useEffect(() => {

        const setcountriesdata = async () => {
            await fetch('https://api.caw.sh/v3/covid-19/countries')
            .then((res) => (res.json()))
            .then((data) => {
                const countries = data.map((item) => (
                    {
                        name: item.country,
                        value: item.countryInfo.iso3
                    }
                    ))
                    setCountries(countries);
                })
            }
        setcountriesdata();
    }, [])
        
    //set the change in the select(country) field and the country info
    const oncountrychange = (event) => {

        const countrycode = event.target.value
        
        const url = countrycode === 'wrldwide' ? 'https://api.caw.sh/v3/covid-19/all' : `https://api.caw.sh/v3/covid-19/countries/${countrycode}` //url for country info
        
        fetch(url)
        .then((response) => (response.json()))
        .then((data) => {
            changecountry(countrycode); //changes the select(country) value
            setcountryInfo(data); //changes the country info
        })

        // for yesterday's data
        (countrycode !== 'wrldwide' ? (
            fetch(`https://api.caw.sh/v3/covid-19/historical/${countrycode}?lastdays=2`)
            .then(response => response.json())
            .then(data => {
                const casestype = data['timeline']
                const yesterday = {
                    'Cases': Object.values(casestype['cases'])[1] - Object.values(casestype['cases'])[0],
                    'Deaths': Object.values(casestype['deaths'])[1] - Object.values(casestype['deaths'])[0],
                    'Recovered': Object.values(casestype['recovered'])[1] - Object.values(casestype['recovered'])[0]
                }
                setyesterdaydata(yesterday)
            })
        ) : (
            fetch('https://api.caw.sh/v3/covid-19/historical/all?lastdays=2')
        .then(response => response.json())
        .then(data => {
            const yesterday = {
                'Cases': Object.values(data['cases'])[1] - Object.values(data['cases'])[0],
                'Deaths': Object.values(data['deaths'])[1] - Object.values(data['deaths'])[0],
                'Recovered': Object.values(data['recovered'])[1] - Object.values(data['recovered'])[0]
            }
            setyesterdaydata(yesterday)
        }) 
        ))
    }


    return (
        <div id='stats' className='section'>
            <Selectcountry oncountrychange={oncountrychange} countryvalue={countryvalue} countries={countries} />

            <Totalcount countryInfo={countryInfo} />

            <h2 style={{marginBottom: '20px'}}>Today</h2>
            <Today countryInfo={countryInfo} />

            <h2 style={{marginBottom: '20px'}}>Yesterday</h2>
            <Yesterday yesterdaydata={yesterdaydata} />

            <div className="chart-container">
                <div className="chart">
                    <Chart data={chartdata} />
                </div>
            </div>
        </div>
    )
}


export default Stats