

export const TasksData = [
    {
        id: 1,
        name: 'CPU usage threshold exceeded',
        eventID: 3,
        startDate: '2020-06-15',
        closed: true,
        updates: [
            {
                id: 1,
                date: '2020-06-18',
                desc: 'Disabling negligible processes affecting the CPU',
                status: 400
            },
            {
                id: 2,
                date: '2020-06-19',
                desc: 'Defragmented the hard drives',
                status: 400
            },
            {
                id: 3,
                date: '2020-06-21',
                desc: 'Closing the event as CPU usage has been lowered significantly',
                status: 100
            }
        ]

    },
    {
        id: 2,
        name: 'Connection issue',
        eventID: 5,
        startDate: '2020-04-28',
        closed: true,
        updates: [
            {
                id: 1,
                date: '2020-04-29',
                desc: 'Redirecting to the emergency connection. Checking for malicious software',
                status: 400
            },
            {
                id: 2,
                date: '2020-04-29',
                desc: 'Resetting network settings',
                status: 400
            },
            {
                id: 3,
                date: '2020-05-30',
                desc: 'Checking for possible hardware malfunctions',
                status: 400
            },
            {
                id: 4,
                date: '2020-05-06',
                desc: 'Setting up a new routing device',
                status: 400
            },
            {
                id: 5,
                date: '2020-05-07',
                desc: 'Establishing new connection',
                status: 200
            },
            {
                id: 6,
                date: '2020-05-11',
                desc: 'Creating a new rule for the monitoring system. Closing the task',
                status: 100
            }
        ]
    },
    {
        id: 3,
        name: 'Memory reaching its maximum capacity',
        eventID: 2,
        startDate: '2020-05-03',
        closed: true,
        updates: [
            {
                id: 1,
                date: '2020-05-16',
                desc: 'Creating the backup for existing data',
                status: 400
            },
            {
                id: 2,
                date: '2020-06-03',
                desc: 'Freeing up space by shrinking the Database and log files',
                status: 400
            },
            {
                id: 3,
                date: '2020-06-21',
                desc: 'Rebuilding the indexes',
                status: 400
            },
            {
                id: 5,
                date: '2020-06-23',
                desc: 'Issue has been resolved. Closing the event',
                status: 100
            }
        ]

    },
    {
        id: 4,
        name: 'Memory reaching its maximum capacity',
        eventID: 2,
        startDate: '2020-05-03',
        closed: true,
        updates: [
            {
                id: 1,
                date: '2020-05-16',
                desc: 'Creating the backup for existing data',
                status: 400
            },
            {
                id: 2,
                date: '2020-06-03',
                desc: 'Freeing up space by shrinking the Database and log files',
                status: 400
            },
            {
                id: 3,
                date: '2020-06-21',
                desc: 'Rebuilding the indexes',
                status: 400
            },
            {
                id: 5,
                date: '2020-06-23',
                desc: 'Issue has been resolved. Closing the event',
                status: 100
            }
        ]

    },
    {
        id: 5,
        name: 'Possible unauthorized data leakage',
        eventID: 10,
        startDate: '2020-08-01',
        closed: true,
        updates: [
            {
                id: 1,
                date: '2020-08-01',
                desc: 'Checking for malicious software',
                status: 400
            },
            {
                id: 2,
                date: '2020-08-03',
                desc: 'Keylogger found and removed. Applying quarantine',
                status: 400
            },
            {
                id: 3,
                date: '2020-08-11',
                desc: 'Creating new encryption keys, refactoring authorization rules',
                status: 400
            },
            {
                id: 3,
                date: '2020-08-15',
                desc: 'Closing the event',
                status: 200
            },
            {
                id: 4,
                date: '2020-06-23',
                desc: 'Creating a new rule for malicious software detection. Closing the task',
                status: 100
            }
        ]

    },
    {
        id: 6,
        name: 'Proxy server not running',
        eventID: 8,
        startDate: '2020-07-11',
        closed: false,
        updates: [{
            id: 1,
            date: '2020-07-14',
            desc: 'Resetting network settings',
            status: 400
        }]
    },
    {
        id: 7,
        name: 'Virtual Machine not running',
        eventID: 6,
        startDate: '2020-07-09',
        closed: false,
        updates: null
    },
    {
        id: 8,
        name: 'Databse capacity threshold exceeded',
        eventID: 1,
        startDate: '2020-05-10',
        closed: false,
        updates: null
    }
]