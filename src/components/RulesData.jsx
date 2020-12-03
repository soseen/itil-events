

export const RulesData = [
    {
        id: 1,
        name: 'CPU percentage over 80%',
        severity: 'Warning',
        priority: 2,
        attribute: 'CPU',
        operator: '>',
        value: '80%',
        date: '2020-03-13'
    },
    {
        id: 2,
        name: 'Router disconnected',
        severity: 'Major',
        priority: 4,
        attribute: 'Router #05423',
        operator: '=',
        value: 'disconnected',
        date: '2020-02-19'
    },
    {
        id: 3,
        name: 'Application not accesible',
        severity: 'Major',
        priority: 5,
        attribute: 'Application service',
        operator: '=',
        value: `couldn't establish connection`,
        date: '2020-06-21'
    },
    {
        id: 4,
        name: 'Database capacity over 70%',
        severity: 'Warning',
        priority: 1,
        attribute: 'Database',
        operator: '>',
        value: '70%',
        date: '2020-02-04'
    },
    {
        id: 5,
        name: 'Latency over 150ms',
        severity: 'Warning',
        priority: 1,
        attribute: 'Latency',
        operator: '>',
        value: '150',
        date: '2020-02-07'
    },
    {
        id: 6,
        name: 'Proxy server not working',
        severity: 'Critical',
        priority: 5,
        attribute: 'Proxy connection',
        operator: '=',
        value: 'disconnected',
        date: '2020-03-01'
    },
    {
        id: 7,
        name: `Couldn't access data`,
        severity: 'Major',
        priority: 4,
        attribute: 'Database',
        operator: '=',
        value: 'no access',
        date: '2020-07-06'
    },
    {
        id: 8,
        name: 'Port is not responding',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 01',
        operator: '=',
        value: 'disconnected',
        date: '2020-05-17'
    },
    {
        id: 9,
        name: 'Port is not responding',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 02',
        operator: '=',
        value: 'disconnected',
        date: '2020-05-17'
    },
    {
        id: 10,
        name: 'Port is not responding',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 03',
        operator: '=',
        value: 'disconnected',
        date: '2020-04-17'
    },
    {
        id: 11,
        name: 'Tomcat server is down',
        severity: 'Major',
        priority: 3,
        attribute: 'Tomcat server',
        operator: '=',
        value: 'disconnected',
        date: '2020-04-11'
    },
    {
        id: 12,
        name: 'Tibco service is down',
        severity: 'Major',
        priority: 3,
        attribute: 'Tibco service',
        operator: '=',
        value: 'disconnected',
        date: '2020-04-12'
    },
    {
        id: 13,
        name: 'Alteon service is down',
        severity: 'Major',
        priority: 3,
        attribute: 'Alteon service',
        operator: '=',
        value: 'disconnected',
        date: '2020-04-15'
    },
    {
        id: 14,
        name: 'Server response time over 3000ms',
        severity: 'Minor',
        priority: 2,
        attribute: 'Server response time',
        operator: '>',
        value: '3000ms',
        date: '2020-04-13'
    },
    {
        id: 15,
        name: 'Server router is down',
        severity: 'Major',
        priority: 4,
        attribute: 'Router 33H65JW7',
        operator: '=',
        value: 'disconnected',
        date: '2020-05-07'
    },
    {
        id: 16,
        name: 'Keylogger detected',
        severity: 'Major',
        priority: 4,
        attribute: 'Malicious software',
        operator: '=',
        value: 'detected',
        date: '2020-05-07'
    }
]