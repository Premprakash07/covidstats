import React, { useState, useEffect } from "react";
import "../css/stats.css";
import Selectcountry from "./stats/Selectcountry";
import Today from "./stats/Today";
import Totalcount from "./stats/Totalcount";
import Yesterday from "./stats/Yesterday";
import Chart from "./Chart";

function Stats() {
  const [countries, setCountries] = useState([]); //set the countries in the select options
  const [countryvalue, changecountry] = useState("wrldwide"); // set the value of the select(country) field
  const [countryInfo, setcountryInfo] = useState({}); //set the country info tp display the total and today report
  const [yesterdaydata, setyesterdaydata] = useState({}); //set data fo the yesterday
  const [chartdata, setchartdata] = useState({});

  //set the country info for world on first load
  useEffect(() => {
    // for total data and todays data
    fetch("https://api.caw.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // for yesterday data
    fetch("https://api.caw.sh/v3/covid-19/historical/all?lastdays=2")
      .then((response) => response.json())
      .then((data) => {
        const yesterday = {
          Cases: Object.values(data.cases)[1] - Object.values(data.cases)[0],
          Deaths: Object.values(data.deaths)[1] - Object.values(data.deaths)[0],
          Recovered:
            Object.values(data.recovered)[1] - Object.values(data.recovered)[0],
        };
        setyesterdaydata(yesterday);
      })
      .catch((error) => {
        console.log(error);
      });

    const fetch_chartdata = async () => {
      await fetch("https://api.caw.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => response.json())
        .then((data) => {
          var newchartdata = [];
          var lastcasedata;
          var lastdeathdata;
          var lastrecoverdata;
          for (var casedata in data.cases) {
            let newdatapoint;
            if (lastcasedata) {
              newdatapoint = {
                date: casedata,
                cases: data.cases[casedata] - lastcasedata,
                death: data.deaths[casedata] - lastdeathdata,
                recovered: data.recovered[casedata] - lastrecoverdata,
              };
              newchartdata.push(newdatapoint);
            }
            lastcasedata = data.cases[casedata];
            lastdeathdata = data.deaths[casedata];
            lastrecoverdata = data.recovered[casedata];
          }
          setchartdata(newchartdata);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetch_chartdata();
  }, []);

  //collect the data to get all the countries in the world
  useEffect(() => {
    const setcountriesdata = async () => {
      await fetch("https://api.caw.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((item) => ({
            name: item.country,
            value: item.countryInfo.iso3,
          }));
          setCountries(countries);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setcountriesdata();
  }, []);

  //set the change in the select(country) field and the country info
  const oncountrychange = (event) => {
    const countrycode = event.target.value;

    const url =
      countrycode === "wrldwide"
        ? "https://api.caw.sh/v3/covid-19/all"
        : `https://api.caw.sh/v3/covid-19/countries/${countrycode}`; //url for country info

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        changecountry(countrycode); //changes the select(country) value
        setcountryInfo(data); //changes the country info
      })
      .catch((error) => {
        console.log(error);
      });

    // for yesterday's data
    countrycode !== "wrldwide"
      ? fetch(
          `https://api.caw.sh/v3/covid-19/historical/${countrycode}?lastdays=30`
        )
          .then((response) => response.json())
          .then((data) => {
            const casestype = data["timeline"];
            const yesterday = {
              Cases:
                Object.values(casestype.cases)[29] -
                Object.values(casestype.cases)[28],
              Deaths:
                Object.values(casestype.deaths)[29] -
                Object.values(casestype.deaths)[28],
              Recovered:
                Object.values(casestype.recovered)[29] -
                Object.values(casestype.recovered)[28],
            };

            var newchartdata = [];
            var lastcasedata;
            var lastdeathdata;
            var lastrecoverdata;
            for (var casedata in data.timeline.cases) {
              if (lastcasedata) {
                var newdatapoint = {
                  date: casedata,
                  cases: data.timeline.cases[casedata] - lastcasedata,
                  death: data.timeline.deaths[casedata] - lastdeathdata,
                  recovered:
                    data.timeline.recovered[casedata] - lastrecoverdata,
                };
                newchartdata.push(newdatapoint);
              }
              lastcasedata = data.timeline.cases[casedata];
              lastdeathdata = data.timeline.deaths[casedata];
              lastrecoverdata = data.timeline.recovered[casedata];
            }
            setchartdata(newchartdata);

            setyesterdaydata(yesterday);
          })
          .catch((error) => {
            console.log(error);
          })
      : fetch("https://api.caw.sh/v3/covid-19/historical/all?lastdays=30")
          .then((response) => response.json())
          .then((data) => {
            const yesterday = {
              Cases:
                Object.values(data.cases)[29] - Object.values(data.cases)[28],
              Deaths:
                Object.values(data.deaths)[29] - Object.values(data.deaths)[28],
              Recovered:
                Object.values(data.recovered)[29] -
                Object.values(data.recovered)[28],
            };

            var newchartdata = [];
            var lastcasedata;
            var lastdeathdata;
            var lastrecoverdata;
            for (var casedata in data.cases) {
              if (lastcasedata) {
                var newdatapoint = {
                  date: casedata,
                  cases: data.cases[casedata] - lastcasedata,
                  death: data.deaths[casedata] - lastdeathdata,
                  recovered: data.recovered[casedata] - lastrecoverdata,
                };
                newchartdata.push(newdatapoint);
              }
              lastcasedata = data.cases[casedata];
              lastdeathdata = data.deaths[casedata];
              lastrecoverdata = data.recovered[casedata];
            }
            setchartdata(newchartdata);
            console.log(newchartdata);

            setyesterdaydata(yesterday);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  return (
    <div id="stats" className="section">
      <Selectcountry
        oncountrychange={oncountrychange}
        countryvalue={countryvalue}
        countries={countries}
      />

      <Totalcount countryInfo={countryInfo} />

      <h2 style={{ marginBottom: "20px" }}>Today</h2>
      <Today countryInfo={countryInfo} />

      <h2 style={{ marginBottom: "20px" }}>Yesterday</h2>
      <Yesterday yesterdaydata={yesterdaydata} />

      <div className="chart-container">
        <div className="chart">
          <Chart data={chartdata} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
