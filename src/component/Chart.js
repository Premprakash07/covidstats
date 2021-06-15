import React from 'react'
import '../css/chart.css'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart(props) {

    return (
        <div>
            <ResponsiveContainer width='100%' aspect={4.0/2.5}>
            <AreaChart data={props.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
                <linearGradient id="colorcases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(255, 41, 41)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="rgb(255, 41, 41)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colordeaths" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(0, 0, 0)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="rgb(0, 0, 0)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorrecovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(37, 255, 37)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="rgb(37, 255, 37)" stopOpacity={0}/>
                </linearGradient>
            </defs>
              <Area type="monotone" dataKey="cases" stroke="red" fillOpacity={1} fill="url(#colorcases)" />
              <Area type="monotone" dataKey="deaths" stroke="black" fillOpacity={1} fill="url(#colordeaths)" />
              <Area type="monotone" dataKey="recovered" stroke="green" fillOpacity={1} fill="url(#colorrecovered)" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart
