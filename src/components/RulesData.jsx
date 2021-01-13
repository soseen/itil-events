export const RulesData = [
    {
        id: 1,
        name: 'Obciążenie procesora powyżej 80%',
        severity: 'Warning',
        priority: 2,
        attribute: 'CPU',
        operator: '>',
        value: '80%',
        date: '2020-03-13'
    },
    {
        id: 2,
        name: 'Router został odłączony',
        severity: 'Major',
        priority: 4,
        attribute: 'Router #05423',
        operator: '=',
        value: 'disconnected',
        date: '2020-02-19'
    },
    {
        id: 3,
        name: 'Brak dostępu do aplikacji',
        severity: 'Major',
        priority: 5,
        attribute: 'Application service',
        operator: '=',
        value: `couldn't establish connection`,
        date: '2020-06-21'
    },
    {
        id: 4,
        name: 'Zapełnienie bazy danych powyżej 70% pojemności',
        severity: 'Warning',
        priority: 1,
        attribute: 'Database',
        operator: '>',
        value: '70%',
        date: '2020-02-04'
    },
    {
        id: 5,
        name: 'Opóźnienie powyżej 150ms',
        severity: 'Warning',
        priority: 1,
        attribute: 'Latency',
        operator: '>',
        value: '150',
        date: '2020-02-07'
    },
    {
        id: 6,
        name: 'Serwer Proxy nie odpowiada',
        severity: 'Critical',
        priority: 5,
        attribute: 'Proxy connection',
        operator: '=',
        value: 'disconnected',
        date: '2020-03-01'
    },
    {
        id: 7,
        name: `Brak dostępu do danych`,
        severity: 'Major',
        priority: 4,
        attribute: 'Database',
        operator: '=',
        value: 'no access',
        date: '2020-07-06'
    },
    {
        id: 8,
        name: 'Port 03 nie odpowiada',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 01',
        operator: '=',
        value: 'disconnected',
        date: '2020-05-17'
    },
    {
        id: 9,
        name: 'Port 04 nie odpowiada',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 02',
        operator: '=',
        value: 'disconnected',
        date: '2020-05-17'
    },
    {
        id: 10,
        name: 'Port 05 nie odpowiada',
        severity: 'Minor',
        priority: 2,
        attribute: 'Port 03',
        operator: '=',
        value: 'disconnected',
        date: '2020-04-17'
    },
    {
        id: 11,
        name: 'Serwer Tomcat jest nieaktywny',
        severity: 'Major',
        priority: 3,
        attribute: 'Tomcat server',
        operator: '=',
        value: 'disconnected',
        date: '2020-04-11'
    },
    {
        id: 12,
        name: 'Serwis Tibco nie odpowiada',
        severity: 'Major',
        priority: 3,
        attribute: 'Tibco service',
        operator: '=',
        value: 'disconnected',
        date: '2020-04-12'
    },
    {
        id: 13,
        name: 'Serwis Alteon nie odpowiada',
        severity: 'Major',
        priority: 3,
        attribute: 'Alteon service',
        operator: '=',
        value: 'disconnected',
        date: '2020-04-15'
    },
    {
        id: 14,
        name: 'Czas oczekiwania na odpowiedź serwera powyżej 3000ms',
        severity: 'Minor',
        priority: 2,
        attribute: 'Server response time',
        operator: '>',
        value: '3000ms',
        date: '2020-04-13'
    },
    {
        id: 15,
        name: 'Brak dostępu do Routera',
        severity: 'Major',
        priority: 4,
        attribute: 'Router 33H65JW7',
        operator: '=',
        value: 'disconnected',
        date: '2020-05-07'
    },
    {
        id: 16,
        name: 'Wykryto niechciane oprogramowanie',
        severity: 'Major',
        priority: 4,
        attribute: 'Malicious software',
        operator: '=',
        value: 'detected',
        date: '2020-05-07'
    }
]