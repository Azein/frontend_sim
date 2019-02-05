import { all } from 'redux-saga/effects'
import gameSaga from '@/scenes/GameScene/saga'

export default function* rootSaga() {
  yield all([gameSaga()])
}
