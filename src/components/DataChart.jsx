import React, { useEffect, useState } from 'react'
import {Doughnut, defaults} from 'react-chartjs-2';
import './DataChart.css'

const DataChart = ({eventsData}) => {

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
        
    },[]);

    return(
        <div className='data-chart-container'>
            <Doughnut 
                data={{
                    labels: ['Warning', 'Minor', 'Major', 'Critical'],
                    datasets: [{
                        label: '# of events',
                        data: [chartData.Warning, chartData.Minor, chartData.Major, chartData.Critical],
                        backgroundColor: [
                            '#0070b1',
                            '#d8d400',
                            '#e46600',
                            '#ff0000'
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
        </div>
    )
}

export default DataChart