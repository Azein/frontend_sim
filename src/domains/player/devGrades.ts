export interface DevGrade {
  name: string
  reqLevel: number
}

interface DevGrades {
  [gradeName: string]: DevGrade
}

const devGrades: DevGrades = {
  junior: {
    name: 'Junior',
    reqLevel: 0,
  },
  middle: {
    name: 'Middle',
    reqLevel: 9,
  },
  senior: {
    name: 'Senior',
    reqLevel: 18,
  },
}

export default devGrades
