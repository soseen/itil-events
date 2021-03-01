import React, { useEffect, useState } from 'react'
import {Doughnut, Bar, defaults} from 'react-chartjs-2';
import './DataChart.css'

const DataChart = ({tasksChartData, eventsData, type}) => {

    defaults.global.maintainAspectRatio = false;
    const [chartData, setChartData] = useState({});
    
    useEffect(() => {

        const eventFrequencies = eventsData.reduce(
            (stats, { severity }) => ({
                ...stats,
                [severity]: stats[severity] + 1 || 1,
            }),
            {},
        );

        setChartData(eventFrequencies);
        
    },[eventsData]);

    return(
        <div className='data-chart-container'>
            {type === 'Doughnut' &&
                <Doughnut 
                data={{
                    labels: ['Warning', 'Minor', 'Major', 'Critical'],
                    datasets: [{
                        label: 'Number of events',
                        data: [chartData.Warning, chartData.Minor, chartData.Major, chartData.Critical],
                        backgroundColor: [
                            '#2a49b1',
                            '#ddcb2c',
                            '#e4880f',
                            '#6d121e'
                        ],
                        borderColor: '#1f1f1f00',
                        borderWidth: 10
                    }],
                }}
                options={{
                    cutoutPercentage: 40,
                    maintainAspectRatio: false,
                    responsive: true,
                }}
                />
            }

            {type === 'Line' &&
                <Bar 
                data={{
                    labels: ['All', 'Active', 'Closed'],
                    datasets: [{
                        label: 'Tasks',
                        data: [tasksChartData.all, tasksChartData.active, tasksChartData.closed],
                        backgroundColor: [
                            '#a89378',
                            '#610a0a',
                            '#1a7516',
                        ],
                        borderColor: '#1f1f1f00',
                        borderWidth: 5
                    }],
                }}
                options= {{
                        maintainAspectRatio: false,
                        responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
                />
            }
            
        </div>
    )
}

export default DataChart