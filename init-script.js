const classesJson = JSON.parse(`
[
  {
    "id": 212,
    "nama": "PEMROGRAMAN BERORIENTASI OBJEK",
    "kode": "1604A021",
    "sks": 6,
    "ujian": "Ujian minggu ke-1 Rabu 10:30",
    "kp": [
      {
        "id": 1406,
        "kode": "C",
        "kuota": 3,
        "jadwal": ["Kamis 07.00-09.45", "Senin 07.00-09.45"]
      },
      {
        "id": 1419,
        "kode": "A",
        "kuota": 0,
        "jadwal": ["Kamis 09.45-12.30", "Senin 09.45-12.30"]
      },
      {
        "id": 1433,
        "kode": "B",
        "kuota": 1,
        "jadwal": ["Kamis 09.45-12.30", "Senin 13.00-15.45"]
      },
      {
        "id": 1434,
        "kode": "D",
        "kuota": 1,
        "jadwal": ["Kamis 13.00-15.45", "Senin 13.00-15.45"]
      },
      {
        "id": 1436,
        "kode": "G",
        "kuota": 4,
        "jadwal": ["Rabu 09.45-12.30", "Senin 13.00-15.45"]
      },
      {
        "id": 1464,
        "kode": "E",
        "kuota": 12,
        "jadwal": ["Selasa 09.45-12.30", "Kamis 13.00-15.45"]
      },
      {
        "id": 1420,
        "kode": "H",
        "kuota": 7,
        "jadwal": ["Senin 09.45-12.30", "Kamis 13.00-15.45"]
      },
      {
        "id": 1435,
        "kode": "F",
        "kuota": 13,
        "jadwal": ["Senin 13.00-15.45", "Kamis 13.00-15.45"]
      }
    ]
  },
  {
    "id": 213,
    "nama": "SISTEM OPERASI",
    "kode": "1604A022",
    "sks": 3,
    "ujian": "Ujian minggu ke-1 Selasa 13:30",
    "kp": [
      {
        "id": 1421,
        "kode": "C",
        "kuota": 0,
        "jadwal": ["Senin 09.45-12.30"]
      },
      {
        "id": 1492,
        "kode": "D",
        "kuota": 0,
        "jadwal": ["Rabu 09.45-12.30"]
      },
      {
        "id": 1504,
        "kode": "B",
        "kuota": 0,
        "jadwal": ["Rabu 13.00-15.45"]
      },
      {
        "id": 1448,
        "kode": "E",
        "kuota": 30,
        "jadwal": ["Selasa 07.00-09.45"]
      },
      {
        "id": 1483,
        "kode": "A",
        "kuota": 0,
        "jadwal": ["Rabu 07.00-09.45"]
      }
    ]
  },
  {
    "id": 214,
    "nama": "MATEMATIKA DISKRIT",
    "kode": "1604A023",
    "sks": 3,
    "ujian": "Ujian minggu ke-2 Senin 10:30",
    "kp": [
      {
        "id": 1532,
        "kode": "A",
        "kuota": 0,
        "jadwal": ["Kamis 13.00-15.45"]
      },
      {
        "id": 1541,
        "kode": "C",
        "kuota": 11,
        "jadwal": ["Kamis 15.45-18.30"]
      },
      {
        "id": 1449,
        "kode": "B",
        "kuota": 3,
        "jadwal": ["Selasa 07.00-09.45"]
      }
    ]
  },
  {
    "id": 331,
    "nama": "BASIS DATA",
    "kode": "1607A021",
    "sks": 4,
    "ujian": "Ujian minggu ke-2 Kamis 10:30",
    "kp": [
      {
        "id": 1440,
        "kode": "A",
        "kuota": 0,
        "jadwal": ["Rabu 10.40-12.30", "Senin 13.00-14.50"]
      },
      {
        "id": 1429,
        "kode": "B",
        "kuota": 0,
        "jadwal": ["Rabu 07.00-08.50", "Senin 10.40-12.30"]
      },
      {
        "id": 1474,
        "kode": "C",
        "kuota": 0,
        "jadwal": ["Kamis 10.40-12.30", "Selasa 10.40-12.30"]
      },
      {
        "id": 1430,
        "kode": "E",
        "kuota": 0,
        "jadwal": ["Rabu 08.50-10.40", "Senin 10.40-12.30"]
      },
      {
        "id": 1431,
        "kode": "F",
        "kuota": 0,
        "jadwal": ["Kamis 10.40-12.30", "Senin 10.40-12.30"]
      },
      {
        "id": 1418,
        "kode": "D",
        "kuota": 4,
        "jadwal": ["Senin 08.50-10.40", "Kamis 08.50-10.40"]
      },
      {
        "id": 1479,
        "kode": "G",
        "kuota": 30,
        "jadwal": ["Kamis 10.40-12.30", "Selasa 15.45-17.35"]
      }
    ]
  },
  {
    "id": 19,
    "nama": "PENULISAN DAN PRESENTASI ILMIAH",
    "kode": "1600A001",
    "sks": 3,
    "ujian": "Ujian minggu ke-1 Senin 10:30",
    "kp": [
      {
        "id": 833,
        "kode": "A",
        "kuota": 1,
        "jadwal": ["Selasa 07.00-09.45"]
      },
      {
        "id": 834,
        "kode": "B",
        "kuota": -1,
        "jadwal": ["Jumat 13.00-15.45"]
      },
      {
        "id": 835,
        "kode": "C",
        "kuota": 0,
        "jadwal": ["Jumat 13.00-15.45"]
      },
      {
        "id": 836,
        "kode": "D",
        "kuota": 16,
        "jadwal": ["Jumat 15.45-18.30"]
      }
    ]
  }
]
`)

/** @type {Course[]} */
const courses = []
/** @type {Class[]} */
let classes = []
/** @type {Schedule[]} */
let schedules = []
classesJson.forEach((item) => {
  item['kp'].forEach((kp) => {
    kp['jadwal'].forEach((schedule) => { schedules.push(Schedule.parse(schedule)) })
    classes.push(new Class(
      kp['kode'],
      kp['kuota'],
      schedules
    ))
    schedules = []
  })
  courses.push(new Course(
    item['id'],
    item['nama'],
    item['kode'],
    item['sks'],
    item['ujian'],
    classes
  ))
  classes = []
});

const scheduleApp = new ScheduleApp(
  document.querySelector('#class'),
  document.querySelector('#schedule'),
  courses,
  new ScheduleAppConfigs(
    ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
    6,
    20
  )
)
