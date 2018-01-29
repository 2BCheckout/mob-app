import { connect } from 'react-redux'
import Splash from '../components/Splash'

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
