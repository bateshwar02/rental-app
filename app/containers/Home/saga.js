import { takeLatest } from 'redux-saga/effects';
import { DEFAULT } from './constants';

function* defaultSaga() {}

export default function* homeSaga() {
    yield takeLatest(DEFAULT, defaultSaga);
}
