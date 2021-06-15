import React from 'react'

function Selectcountry(props) {
    return (
        <div className="sel-country">
                <select name="countries" onChange={props.oncountrychange} value={props.countryvalue}>
                    <option value='wrldwide'>Worldwide</option>
                {
                    props.countries.map((country) => (
                        <option value={country.value}>{country.name}</option>
                    ))
                }
                </select>
            </div>
    )
}

export default Selectcountry
