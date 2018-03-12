import auth from './auth/Reducer'
import nav from './navigation/Reducer'
import student from './studentVerifier/Reducer'

const mainReducer = {
    nav,
    auth,
    student
}

export default mainReducer;