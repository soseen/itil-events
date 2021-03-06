import React from 'react';
import './Team.scss';

const Team = ({team, tasksData, filterByTeam}) => {

    let teamTasks = tasksData.reduce((tasks, taskObject) => 
        taskObject.team === team.id ? [...tasks, taskObject] : tasks
    ,[]);

    console.log(teamTasks);

    let tasksFreq = teamTasks.reduce((tasks, taskObject) => {
        if(taskObject.closed){
            tasks['closed']++
        } else {
            tasks['active']++
        } 
        return tasks;
    }, {all: teamTasks.length, active: 0, closed: 0});


    return(
        <div className={team.highlighted ? 'team-container team-container-highlighted' : 'team-container' } onClick={() => filterByTeam(team)}>
            <div className='team-header-container'>
                <div className='team-id-box'>{team.id}</div>
                <div className='team-details-header'>
                    <p className='team-name'>{team.name}</p>
                    <p className='team-active-tasks'>Active tasks: <span className={tasksFreq.active > 0 ? 'team-active-tasks-highlighted' : ''}>{tasksFreq.active}</span></p>
                </div>
            </div>
            {/* <div className={expanded ? 'team-details' : 'team-details team-details-hidden'}>
                    <div className='team-details-chart'>
                        <Bar 
                            data={{
                                labels: ['All', 'Active', 'Closed'],
                                datasets: [{
                                    label: 'Tasks',
                                    data: [tasksFreq.all, tasksFreq.active, tasksFreq.closed],
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
                                        beginAtZero: true,
                                        stepSize: 1
                                        }
                                    }]
                                }
                            }}
                        />
                    </div>
                </div> */}
        </div>
    )
}   

export default Team;