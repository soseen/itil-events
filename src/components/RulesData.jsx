

export const RulesData = [
    {
        id: 1,
        name: 'CPU percentage over 80%',
        severity: 'Warning',
        priority: 2,
        attribute: 'CPU',
        operator: '>',
        value: '80%',
        date: '25-03-2020'
    },
    {
        id: 2,
        name: 'Router disconnected',
        severity: 'Major',
        priority: 4,
        attribute: 'Router #05423',
        operator: '=',
        value: 'disconnected',
        date: '12-04-2020'
    },
    {
        id: 3,
        name: 'Application not accesible',
        severity: 'Major',
        priority: 5,
        attribute: 'Application service',
        operator: '=',
        value: `couldn't establish connection`,
        date: '13-03-2020'
    },
    {
        id: 4,
        name: 'Database capacity over 70%',
        severity: 'Warning',
        priority: 1,
        attribute: 'Database',
        operator: '>',
        value: '70%',
        date: '12-04-2020'
    },
    {
        id: 5,
        name: 'Latency over 150ms',
        severity: 'Warning',
        priority: 1,
        attribute: 'Latency',
        operator: '>',
        value: '150',
        date: '11-07-2020'
    },
    {
        id: 6,
        name: 'Proxy server not working',
        severity: 'Critical',
        priority: 5,
        attribute: 'Proxy connection',
        operator: '=',
        value: 'disconnected',
        date: '03-01-2020'
    },
    {
        id: 7,
        name: `Couldn't access data`,
        severity: 'Major',
        priority: 4,
        attribute: 'Database',
        operator: '=',
        value: 'no access',
        date: '08-07-2020'
    },
    {
        id: 8,
        name: 'Port is not responding',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 01',
        operator: '=',
        value: 'disconnected',
        date: '17-08-2020'
    },
    {
        id: 9,
        name: 'Port is not responding',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 02',
        operator: '=',
        value: 'disconnected',
        date: '17-08-2020'
    },
    {
        id: 10,
        name: 'Port is not responding',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 03',
        operator: '=',
        value: 'disconnected',
        date: '17-08-2020'
    },
    {
        id: 11,
        name: 'Tomcat server is down',
        severity: 'Major',
        priority: 3,
        attribute: 'Tomcat server',
        operator: '=',
        value: 'disconnected',
        date: '11-04-2020'
    },
    {
        id: 12,
        name: 'Tibco service is down',
        severity: 'Major',
        priority: 3,
        attribute: 'Tibco service',
        operator: '=',
        value: 'disconnected',
        date: '11-04-2020'
    },
    {
        id: 13,
        name: 'Alteon service is down',
        severity: 'Major',
        priority: 3,
        attribute: 'Alteon server',
        operator: '=',
        value: 'disconnected',
        date: '12-04-2020'
    },
    {
        id: 14,
        name: 'Server response time over 3000ms',
        severity: 'Minor',
        priority: 2,
        attribute: 'Server response time',
        operator: '>',
        value: '3000ms',
        date: '10-06-2020'
    }
]