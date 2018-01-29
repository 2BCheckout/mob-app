import { connect } from 'react-redux'
import AppNavigator from '../components/AppNavigator'

const mapStateToProps = (state, ownProps) => ({
    nav: state.nav
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)
