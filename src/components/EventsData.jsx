
export const EventsData = [
    {
        id: 1,
        severity: 'Warning',
        source: 'SolarWinds',
        service: [1, 3, 5],
        desc: 'Przekroczono 70% pojemności magazynu',
        startDate: '2020-05-06',
        endDate: null,
        resolved: false
    },
    {
        id: 2,
        severity: 'Major',
        source: 'SolarWinds',
        service: [3, 4, 5],
        desc: 'Błąd odczytu z pamięci dysku',
        startDate: '2020-05-03',
        endDate: '2020-06-23',
        resolved: true
    },
    {
        id: 3,
        severity: 'Minor',
        source: 'Nagios',
        service: [1],
        desc: 'Obciążenie procesora powyżej 80%',
        startDate: '2020-06-02',
        endDate: '2020-06-23',
        resolved: true
    },
    {
        id: 4,
        severity: 'Warning',
        source: 'Group Alert',
        service: null,
        desc: 'Karta NIC nie została podłączona',
        startDate: '2020-03-11',
        endDate: null,
        resolved: false
    },
    {
        id: 5,
        severity: 'Critical',
        source: 'Nagios',
        service: [4, 6],
        desc: `Nie można ustanowić połączenia`,
        startDate: '2020-04-27',
        endDate: '2020-05-07',
        resolved: true
    },
    {
        id: 6,
        severity: 'Warning',
        source: 'Group Alert',
        service: [6],
        desc: 'Brak dostępu do maszyny wirtualnej Oracle VM',
        startDate: '2020-07-05',
        endDate: null,
        resolved: false
    },
    {
        id: 7,
        severity: 'Warning',
        source: 'Group Alert',
        service: [4,8],
        desc: 'Opóźnienie powyżej 150ms',
        startDate: '2020-05-06',
        endDate: null,
        resolved: false
    },
    {
        id: 8,
        severity: 'Critical',
        source: 'Nagios',
        service: [6],
        desc: 'Serwer Proxy przestał działać',
        startDate: '2020-07-07',
        endDate: null,
        resolved: false
    },
    {
        id: 9,
        severity: 'Minor',
        source: 'SCOM',
        service: [7, 5],
        desc: 'Port 03 nie odpowiada',
        startDate: '2020-07-04',
        endDate: null,
        resolved: false
    },
    {
        id: 10,
        severity: 'Major',
        source: 'SCOM',
        service: [8],
        desc: 'Nieautoryzowana aktywność',
        startDate: '2020-08-01',
        endDate: '2020-08-15',
        resolved: true
    },
    {
        id: 11,
        severity: 'Warning',
        source: 'SCOM',
        service: [5],
        desc: 'Sterownik pamięci wymaga aktualizacji',
        startDate: '2020-09-11',
        endDate: '',
        resolved: false
    },
    {
        id: 12,
        severity: 'Minor',
        source: 'Group Alert',
        service: [6],
        desc: 'Klient aplikacji użytkownika nie odpowiada',
        startDate: '2020-09-11',
        endDate: null,
        resolved: false
    },
];
