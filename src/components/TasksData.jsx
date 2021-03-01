

export const TasksData = [
    {
        id: 1,
        name: 'Przekroczony próg użycia procesora',
        eventID: 3,
        startDate: '2020-06-15',
        closed: true,
        team: {
            id: 1,
            name: 'Inżyniera serwisów'
        },
        updates: [
            {
                id: 1,
                date: '2020-06-18',
                desc: 'Zamykanie zbędnych procesów wpływających na działanie procesora',
                status: 400
            },
            {
                id: 2,
                date: '2020-06-19',
                desc: 'Defragmentacja dysków',
                status: 400
            },
            {
                id: 3,
                date: '2020-06-21',
                desc: 'Użycie procesora w stanie optymalnym. Zamknięcie zdarzenia',
                status: 200
            }
        ]

    },
    {
        id: 2,
        name: 'Problem z połączeniem z serwerem',
        eventID: 5,
        startDate: '2020-04-28',
        closed: true,
        team: {
            id: 2,
            name: 'Zarządzanie siecią'
        },
        updates: [
            {
                id: 4,
                date: '2020-04-29',
                desc: 'Przekierowanie do połączenia awaryjnego',
                status: 400
            },
            {
                id: 5,
                date: '2020-04-29',
                desc: 'Przywracanie ustawień fabrycznych sieci',
                status: 400
            },
            {
                id: 6,
                date: '2020-05-30',
                desc: 'Poszukiwanie możliwych błędów sprzętowych',
                status: 400
            },
            {
                id: 7,
                date: '2020-05-06',
                desc: 'Konfiguracja nowego routera. Przywracanie połączenia',
                status: 400
            },
            {
                id: 8,
                date: '2020-05-07',
                desc: 'Zamknięcie zdarzenia',
                status: 200
            },
            {
                id: 9,
                date: '2020-05-11',
                desc: 'Stworzenie nowej reguły. Zamknięcie zadania',
                status: 100
            }
        ]
    },
    {
        id: 3,
        name: 'Wymagana aktualizacja sterownika',
        eventID: 11,
        startDate: '2020-09-12',
        closed: false,
        team: {
            id: 3,
            name: 'Inżynieria oprogramowania'
        },
        updates: [
            {
                id: 10,
                date: '2020-09-13',
                desc: 'Sprawdzanie kompatybilności sterowników',
                status: 400
            },
            {
                id: 11,
                date: '2020-09-16',
                desc: 'Aktualizacja sterownika',
                status: 400
            }
        ]

    },
    {
        id: 4,
        name: 'Pamięć bazy danych blisko limitu',
        eventID: 2,
        startDate: '2020-05-03',
        closed: true,
        team: {
            id: 1,
            name: 'Inżyniera serwisów'
        },
        updates: [
            {
                id: 12,
                date: '2020-05-16',
                desc: 'Twrzenie backupu',
                status: 400
            },
            {
                id: 13,
                date: '2020-06-03',
                desc: 'Zwalnianie miejsca w bazie danych poprzez jej zmniejszenie (shrinking) oraz usuwanie zbędnych logów',
                status: 400
            },
            {
                id: 14,
                date: '2020-06-21',
                desc: 'Przebudowanie indeksów',
                status: 400
            },
            {
                id: 15,
                date: '2020-06-23',
                desc: 'Problem rozwiązany. Zamknięcie zdarzenia',
                status: 200
            }
        ]

    },
    {
        id: 5,
        name: 'Możliwy nieautoryzowany wgląd w dane poufne',
        eventID: 10,
        startDate: '2020-08-01',
        closed: true,
        team: {
            id: 1,
            name: 'Inżyniera serwisów'
        },
        updates: [
            {
                id: 16,
                date: '2020-08-01',
                desc: 'Poszukiwanie niechcianego oprogramowania',
                status: 400
            },
            {
                id: 17,
                date: '2020-08-03',
                desc: 'Znaleziono Keylogger. Zastosowanie kwarantanny',
                status: 400
            },
            {
                id: 18,
                date: '2020-08-11',
                desc: 'Wytworzenie nowych kluczy szyfrujących, refaktoryzacja autoryzacji',
                status: 400
            },
            {
                id: 19,
                date: '2020-08-15',
                desc: 'Zamknięcie zdarzenia',
                status: 200
            },
            {
                id: 20,
                date: '2020-06-23',
                desc: 'Stworzenie nowej reguły dla przechwytywania niechcianego oprogramowania',
                status: 100
            }
        ]

    },
    {
        id: 6,
        name: 'Serwer Proxy nie odpowiada',
        eventID: 8,
        startDate: '2020-07-11',
        closed: false,
        team: {
            id: 2,
            name: 'Zarządzanie siecią'
        },
        updates: [{
            id: 21,
            date: '2020-07-14',
            desc: 'Resetowanie ustawień sieciowych',
            status: 400
        }]
    },
    {
        id: 7,
        name: 'Maszyna wirtualna nie odpowiada',
        eventID: 6,
        startDate: '2020-07-09',
        closed: false,
        team: {
            id: 3,
            name: 'Inżynieria oprogramowania'
        },
        updates: null
    },
    {
        id: 8,
        name: 'Klient aplikacji użytkownika nie odpowiada',
        eventID: 12,
        startDate: '2020-05-10',
        closed: false,
        team: {
            id: 1,
            name: 'Inżynieria serwisów'
        },
        updates: null
    }
]