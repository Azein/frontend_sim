import { all } from 'redux-saga/effects'
import gameSaga from '@/views/GameScene/saga'

export default function* rootSaga() {
  yield all([gameSaga()])
}
