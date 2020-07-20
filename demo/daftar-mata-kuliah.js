const daftarMataKuliah = [
    {
        id: 2431,
        kode: '1000A005',
        nama: 'Pendidikan Agama Islam',
        kelas: [
            {
                id: 1670,
                kode: 'E1',
                jadwal: [
                    {
                        hari: 'Rabu',
                        waktuMulai: '15.45',
                        waktuBerakhir: '18.30'
                    }
                ],
                kuota: 55
            }
        ],
        sks: 3,
        ujian: 'Ujian minggu ke-1 Senin 16:00'
    },
    {
        id: 2674,
        kode: '1604B024',
        nama: 'Human Computer Interaction',
        kelas: [
            {
                id: 1686,
                kode: 'A',
                jadwal: [
                    {
                        hari: 'Senin',
                        waktuMulai: '07.55',
                        waktuBerakhir: '09.45'
                    }
                ],
                kuota: 70
            },
            {
                id: 1789,
                kode: 'B',
                jadwal: [
                    {
                        hari: 'Kamis',
                        waktuMulai: '10.40',
                        waktuBerakhir: '12.30'
                    }
                ],
                kuota: 70
            }
        ],
        sks: 2,
        ujian: 'Ujian minggu ke-2 Selasa 10:30'
    },
    {
        id: 2675,
        kode: '1604B031',
        nama: 'Data Structure',
        kelas: [
            {
                id: 1799,
                kode: 'B',
                jadwal: [
                    {
                        hari: 'Kamis',
                        waktuMulai: '15.45',
                        waktuBerakhir: '18.30'
                    }
                ],
                kuota: 80
            },
            {
                id: 1798,
                kode: 'A',
                jadwal: [
                    {
                        hari: 'Kamis',
                        waktuMulai: '15.45',
                        waktuBerakhir: '18.30'
                    }
                ],
                kuota: 80
            },
            {
                id: 1790,
                kode: 'Z',
                jadwal: [
                    {
                        hari: 'Kamis',
                        waktuMulai: '13.00',
                        waktuBerakhir: '15.45'
                    }
                ],
                kuota: 10
            }
        ],
        sks: 3,
        ujian: 'Ujian minggu ke-1 Jumat 07:30'
    },
    {
        id: 2676,
        kode: '1604B032',
        nama: 'Computer Network',
        kelas: [
            {
                id: 1791,
                kode: 'B',
                jadwal: [
                    {
                        hari: 'Kamis',
                        waktuMulai: '13.00',
                        waktuBerakhir: '15.45'
                    }
                ],
                kuota: 30
            },
            {
                id: 1705,
                kode: 'A',
                jadwal: [
                    {
                        hari: 'Senin',
                        waktuMulai: '13.00',
                        waktuBerakhir: '15.45'
                    }
                ],
                kuota: 30
            },
            {
                id: 1728,
                kode: 'Z',
                jadwal: [
                    {
                        hari: 'Selasa',
                        waktuMulai: '09.45',
                        waktuBerakhir: '12.30'
                    }
                ],
                kuota: 30
            }
        ],
        sks: 3,
        ujian: 'Ujian minggu ke-2 Senin 13:30'
    },
    {
        id: 2678,
        kode: '1604B034',
        nama: 'Software Engineering',
        kelas: [
            {
                id: 1729,
                kode: 'A',
                jadwal: [
                    {
                        hari: 'Kamis',
                        waktuMulai: '07.55',
                        waktuBerakhir: '09.45'
                    },
                    {
                        hari: 'Selasa',
                        waktuMulai: '09.45',
                        waktuBerakhir: '12.30'
                    }
                ],
                kuota: 60
            },
            {
                id: 1707,
                kode: 'C',
                jadwal: [
                    {
                        hari: 'Rabu',
                        waktuMulai: '10.40',
                        waktuBerakhir: '12.30'
                    },
                    {
                        hari: 'Senin',
                        waktuMulai: '13.00',
                        waktuBerakhir: '15.45'
                    }
                ],
                kuota: 60
            },
            {
                id: 1706,
                kode: 'B',
                jadwal: [
                    {
                        hari: 'Rabu',
                        waktuMulai: '10.40',
                        waktuBerakhir: '12.30'
                    },
                    {
                        hari: 'Senin',
                        waktuMulai: '13.00',
                        waktuBerakhir: '15.45'
                    }
                ],
                kuota: 60
            },
            {
                id: 1694,
                kode: 'Z',
                jadwal: [
                    {
                        hari: 'Kamis',
                        waktuMulai: '09.45',
                        waktuBerakhir: '11.35'
                    },
                    {
                        hari: 'Senin',
                        waktuMulai: '09.45',
                        waktuBerakhir: '12.30'
                    }
                ],
                kuota: 60
            }
        ],
        sks: 5,
        ujian: 'Ujian minggu ke-1 Kamis 10:30'
    },
    {
        id: 2679,
        kode: '1604B035',
        nama: 'Statistics',
        kelas: [
            {
                id: 1751,
                kode: 'A',
                jadwal: [
                    {
                        hari: 'Rabu',
                        waktuMulai: '09.45',
                        waktuBerakhir: '12.30'
                    }
                ],
                kuota: 80
            },
            {
                id: 1730,
                kode: 'B',
                jadwal: [
                    {
                        hari: 'Selasa',
                        waktuMulai: '09.45',
                        waktuBerakhir: '12.30'
                    }
                ],
                kuota: 80
            },
            {
                id: 1731,
                kode: 'Z',
                jadwal: [
                    {
                        hari: 'Selasa',
                        waktuMulai: '09.45',
                        waktuBerakhir: '12.30'
                    }
                ],
                kuota: 10
            }
        ],
        sks: 3,
        ujian: 'Ujian minggu ke-1 Rabu 07:30'
    },
    {
        id: 2739,
        kode: '1604B131',
        nama: 'Management Information Systems',
        kelas: [
            {
                id: 1717,
                kode: 'A',
                jadwal: [
                    {
                        hari: 'Selasa',
                        waktuMulai: '07.00',
                        waktuBerakhir: '09.45'
                    }
                ],
                kuota: 60
            },
            {
                id: 1802,
                kode: 'B',
                jadwal: [
                    {
                        hari: 'Jumat',
                        waktuMulai: '07.00',
                        waktuBerakhir: '09.45'
                    }
                ],
                kuota: 60
            }
        ],
        sks: 3,
        ujian: 'Ujian minggu ke-2 Senin 10:30'
    }
]
