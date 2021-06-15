import React, {useState, useEffect} from 'react'
import '../css/worldtable.css'
import Chart from './Chart'

function WorldTable() {
    
    const [tableData, setTableData] = useState([{}])
    const [chartdata, setchartdata] = useState({})

    useEffect(() => {
        const setcountriesdata = async () => {
            await fetch('https://api.caw.sh/v3/covid-19/countries')
            .then((res) => (res.json()))
            .then((data) => {
                const sorteddata = data.sort((a, b) => (b.cases - a.cases))
                setTableData(sorteddata);
            })
        }
        setcountriesdata();

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

    return (
        <div id='worldtable' class='worldtable'>
            <h2>Worldwide</h2>
            <div className="table">
                {
                    tableData.map((item) => (
                        <div className="row">
                            <div className="country-name">{item.country}</div>
                            <div className="country-cases">{item.cases}</div>
                        </div>
                    ))
                }
            </div>
            <div className="graph">
                <Chart data={chartdata} />
            </div>
        </div>
    )
}

export default WorldTable
