// @flow

type DevGrades = {
  [gradeName: string]: {
    name: string,
    reqLevel: number,
  },
};

const devGrades: DevGrades = {
  junior: {
    name: 'Джуниор',
    reqLevel: 0,
  },
  middle: {
    name: 'Мидл',
    reqLevel: 9,
  },
  senior: {
    name: 'Сеньор',
    reqLevel: 18,
  },
};

export default devGrades;
