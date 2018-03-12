import { connect } from 'react-redux'
import AppNavigator from '../components/AppNavigator'
import { bindActionCreators } from 'redux'

const ActionCreators = {}

const mapStateToProps = (state, ownProps) => ({
    nav: state.nav
})

const mapDispatchToProps = (dispatch) => Object.assign({dispatch: dispatch}, bindActionCreators(ActionCreators, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)
