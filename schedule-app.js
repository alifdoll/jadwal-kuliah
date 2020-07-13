class Course {
  /**
   * @param {Number} id
   * @param {String} name
   * @param {String} code
   * @param {Number} credits
   * @param {String} exam
   * @param {Class[]} classes
   */
  constructor(id, name, code, credits, exam, classes) {
    this.id = id
    this.name = name
    this.code = code
    this.credits = credits
    this.exam = exam
    this.classes = classes
  }

  /**
  * @param {Course} course
  * @param {String[]} dayNames
  */
  static sortClasses(course, dayNames) {
    let sorted0
    do {
      sorted0 = true
      for (let i = 0; i < course.classes.length; i++) {
        if (i !== course.classes.length - 1
          &&
          course.classes[i].code > course.classes[i + 1].code
        ) {
          const t = course.classes[i + 1]
          course.classes[i + 1] = course.classes[i]
          course.classes[i] = t
          sorted0 = false
        }
        let sorted1
        do {
          sorted1 = true
          for (let j = 0; j < course.classes[i].schedules.length - 1; j++) {
            const s0 = course.classes[i].schedules[j]
            const s1 = course.classes[i].schedules[j + 1]
            if (dayNames.indexOf(s0.day) > dayNames.indexOf(s1.day)) {
              const t = s1
              course.classes[i].schedules[j + 1] = s0
              course.classes[i].schedules[j] = t
              sorted1 = false
            }
          }
        } while (!sorted1)
      }
    } while (!sorted0)
  }
}

class Class {
  /**
   * @param {String} code
   * @param {Number} quota
   * @param {Schedule[]} schedules
   */
  constructor(code, quota, schedules) {
    this.code = code
    this.quota = quota
    this.schedules = schedules
  }
}

class Schedule {
  /**
   * @param {String} day
   * @param {Number} minuteFrom
   * @param {Number} minuteTo
   */
  constructor(day, minuteFrom, minuteTo) {
    this.day = day
    this.minuteFrom = minuteFrom
    this.minuteTo = minuteTo
  }

  toText() {
    return this.day +
      ' ' +
      Schedule.totalMinuteToTime(this.minuteFrom) +
      '-' +
      Schedule.totalMinuteToTime(this.minuteTo)
  }

  /** @param {Schedule} schedule */
  overlap(schedule) {
    if (this.day !== schedule.day) return false
    return (schedule.minuteFrom >= this.minuteFrom) ? (schedule.minuteFrom < this.minuteTo) : (schedule.minuteTo > this.minuteFrom)
  }

  /** @param {String} string */
  static parse(string) {
    return new Schedule(
      string.substring(0, string.indexOf(' ')),
      Schedule.timeToTotalMinute(string.substring(string.indexOf(' ') + 1, string.indexOf('-'))),
      Schedule.timeToTotalMinute(string.substring(string.indexOf('-') + 1))
    )
  }

  /** @param {String} string */
  static timeToTotalMinute(string) {
    return Number.parseInt(string.substring(0, string.indexOf('.'))) * 60 +
      Number.parseInt(string.substring(string.indexOf('.') + 1))
  }

  /** @param {Number} totalMinute */
  static totalMinuteToTime(totalMinute) {
    return Number.parseInt(totalMinute / 60).toString().padStart(2, '0') +
      '.' +
      (totalMinute % 60).toString().padStart(2, '0')
  }
}

class ScheduleAppConfigs {
  /**
   * @param {String[]} dayNames
   * @param {Number} timeFrom
   * @param {Number} timeTo
   */
  constructor(dayNames, timeFrom, timeTo) {
    this.dayNames = dayNames || ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
    this.timeFrom = timeFrom || 8
    this.timeTo = timeTo || 16
  }
}

class Xid {
  /**
   * @param {String} courseCode
   * @param {String} classCode
   */
  constructor(courseCode, classCode) {
    this.courseCode = courseCode
    this.classCode = classCode
  }

  xid() {
    return `${this.courseCode}:${this.classCode}`
  }

  /** @param {String} string */
  static parse(string) {
    return new Xid(string.substring(0, string.indexOf(':')), string.substring(string.indexOf(':') + 1))
  }
}

class ScheduleApp {
  _attrXid = 'data-xid'
  _attrSelectedXid = 'data-selected-xid'
  _attrOverlapXid = 'data-overlap-xid'

  /** @type {Course[]} */
  courses = []
  /** @type {Xid[]} */
  selectedClassXids = []

  courseTableHeaderTexts = ['ID', 'Nama', 'Kode', 'Kredit', 'Ujian', 'KP']

  /**
   * @param {HTMLTableElement} courseTable
   * @param {HTMLTableElement} scheduleTable
   * @param {Course[]} courses
   * @param {ScheduleAppConfigs} configs
   */
  constructor(courseTable, scheduleTable, courses, configs) {
    this.courseTable = courseTable
    this.scheduleTable = scheduleTable
    this.courses = courses
    this.configs = configs

    this.courses.forEach((course) => { Course.sortClasses(course, this.configs.dayNames) });

    this.courseTable.createTHead().insertRow()
    this.courseTableHeaderTexts.forEach((text) => {
      this.courseTable.tHead.rows[0].appendChild(document.createElement('th')).textContent = text
    });
    this.courseTable.createTBody()
    this.courses.forEach((course) => {
      const tr = this.courseTable.tBodies[0].insertRow()
      tr.insertCell().textContent = course.id
      tr.insertCell().textContent = course.name
      tr.insertCell().textContent = course.code
      tr.insertCell().textContent = course.credits
      tr.insertCell().textContent = course.exam
      const classContainerDiv = tr.insertCell().appendChild(document.createElement('div'))
      classContainerDiv.classList.add('class-container')
      course.classes.forEach((item) => {
        const classDiv = classContainerDiv.appendChild(document.createElement('div'))
        classDiv.classList.add('class')
        classDiv.addEventListener('click', () => {
          this.toggleClass(Xid.parse(classDiv.getAttribute(this._attrXid)))
        })
        classDiv.appendChild(document.createElement('p')).textContent = `KP ${item.code} (Kuota ${item.quota})`
        classDiv.setAttribute(this._attrXid, (new Xid(course.code, item.code)).xid())
        item.schedules.forEach((schedule) => {
          classDiv.appendChild(document.createElement('p')).textContent = schedule.toText()
        })
      })
    });

    this.scheduleTable.createTHead().insertRow()
      .appendChild(document.createElement('th'))
      .setAttribute('colspan', (this.configs.dayNames.length + 1).toString())
    this.scheduleTable.tHead.insertRow().appendChild(document.createElement('th')).textContent = 'Waktu'
    this.configs.dayNames.forEach((dayName) => {
      this.scheduleTable.tHead.rows[1].appendChild(document.createElement('th')).textContent = dayName
    });
    this.scheduleTable.createTBody()
    for (let i = configs.timeFrom; i <= configs.timeTo; i++) {
      const tr = this.scheduleTable.tBodies[0].insertRow()
      for (let i = 0; i <= this.configs.dayNames.length; i++) { tr.insertCell() }
      tr.firstChild.textContent = Schedule.totalMinuteToTime(i * 60)
    }
    this.updateScheduleTable()
  }

  /** @param {Xid} xid */
  toggleClass(xid) {
    const classDiv = this.courseTable.querySelector(`.class[${this._attrXid}='${xid.xid()}']`)
    if (classDiv.getAttribute(this._attrOverlapXid) !== null) return
    const prevClassXid = classDiv.parentElement.getAttribute(this._attrSelectedXid) === null ? null : Xid.parse(classDiv.parentElement.getAttribute(this._attrSelectedXid))
    const removeSelf = xid.xid() === (prevClassXid === null ? '' : prevClassXid.xid())
    if (removeSelf) {
      classDiv.classList.remove('class--selected')
      classDiv.parentElement.removeAttribute(this._attrSelectedXid)
      this.unselectClass(xid)
    } else {
      classDiv.classList.add('class--selected')
      classDiv.parentElement.setAttribute(this._attrSelectedXid, xid.xid())
      if (prevClassXid !== null) {
        classDiv.parentElement.querySelector(`.class[${this._attrXid}='${prevClassXid.xid()}']`).classList.remove('class--selected')
        this.unselectClass(prevClassXid)
      }
      this.selectClass(xid)
    }
    classDiv.parentElement.parentElement.parentElement.style.background = removeSelf ? '' : getComputedStyle(document.documentElement).getPropertyValue('--tr-selected-background-color')
    this.updateScheduleTable()
  }

  /** @param {Xid} xid */
  selectClass(xid) {
    this.selectedClassXids.push(xid)
    const selectedCourse = this.courses.find((course) => course.code === xid.courseCode)
    const selectedClass = selectedCourse.classes.find((item) => item.code === xid.classCode)
    this.courses.forEach((course) => {
      if (course.code !== selectedCourse.code) {
        course.classes.forEach((item) => {
          item.schedules.forEach((schedule0) => {
            selectedClass.schedules.forEach((schedule1) => {
              if (schedule0.overlap(schedule1)) {
                const classDiv = this.courseTable.querySelector(`.class[${this._attrXid}='${(new Xid(course.code, item.code)).xid()}']`)
                if (classDiv.getAttribute(this._attrOverlapXid) === null) {
                  classDiv.setAttribute(this._attrOverlapXid, (new Xid(selectedCourse.code, selectedClass.code)).xid())
                  const overlapText = classDiv.appendChild(document.createElement('p'))
                  overlapText.classList.add('class__overlap-message')
                  overlapText.innerHTML = `Bertabrakan dengan <b>${selectedCourse.name} (KP ${selectedClass.code})</b> pada <b>${schedule1.toText()}</b>`
                  overlapText.style.marginLeft = 'calc(-1px - 8px)'
                  overlapText.style.marginTop = `calc(-1px + 8px - ${classDiv.clientHeight}px)`
                }
              }
            })
          })
        })
      }
    })
  }

  /** @param {Xid} xid */
  unselectClass(xid) {
    this.selectedClassXids = this.selectedClassXids.filter((item) => item.xid() !== xid.xid())
    this.courseTable.querySelectorAll(`.class[${this._attrOverlapXid}='${xid.xid()}']`).forEach((el) => {
      el.querySelector('.class__overlap-message').remove()
      el.removeAttribute(this._attrOverlapXid)
    })
  }

  updateScheduleTable() {
    this.scheduleTable.tHead.rows[0].cells[0].textContent = `Kamu telah memilih ${this.selectedClassXids.length}/${this.courses.length} kelas`
    this.scheduleTable.tBodies[0].querySelectorAll('.schedule').forEach((el) => { el.remove() })
    this.selectedClassXids.forEach((xid) => { this.drawSchedule(xid) })
  }

  /** @param {Xid} xid */
  drawSchedule(xid) {
    const course = this.courses.find((item) => item.code === xid.courseCode)
    course.classes.find((item) => item.code === xid.classCode).schedules.forEach((schedule) => {
      const timeDifference = schedule.minuteTo - schedule.minuteFrom
      const scheduleDiv = this.scheduleTable.tBodies[0]
        .querySelector(
          `tr:nth-child(${Number.parseInt(schedule.minuteFrom / 60) - this.configs.timeFrom + 1})>` +
          `td:nth-child(${this.configs.dayNames.indexOf(schedule.day) + 2})`
        )
        .appendChild(document.createElement('div'))
      scheduleDiv.classList.add('schedule')
      scheduleDiv.style.height = `calc(
                ${Number.parseInt(timeDifference / 60) * 4}rem +
                ${(timeDifference % 60) / 60 * 4}rem -
                1px)`
      scheduleDiv.style.marginTop = `calc(
                -2rem +
                ${(schedule.minuteFrom % 60) / 60 * 4}rem +
                1px)`
      const scheduleInfoDiv = scheduleDiv.appendChild(document.createElement('div'))
      scheduleInfoDiv.classList.add('schedule-info')
      scheduleInfoDiv.appendChild(document.createElement('p')).textContent = `${course.name} (KP ${xid.classCode})`
      scheduleInfoDiv.appendChild(document.createElement('p')).textContent = schedule.toText()
    })
  }
}
