import React, { useEffect, useState } from 'react'
import {Doughnut, Bar, defaults} from 'react-chartjs-2';
import './DataChart.css'

const DataChart = ({eventsData, type}) => {

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

        console.log(eventFrequencies);
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
                    labels: ['Warning', 'Minor', 'Major', 'Critical'],
                    datasets: [{
                        label: '# of events',
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
                options= {{
                        cutoutPercentage: 40,
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