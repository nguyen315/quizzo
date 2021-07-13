import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {authReducer} from '../../store/reducers/authReducer'

const LoginForm: React.FC = () => {
    return (
        <div>
            
        </div>
    )
}

LoginForm.propTypes = {
    LoginUser: PropTypes.func.isRequired
}

type State = {}

// const mapStateToProps = (state: State) => {
//     auth: state.auth.user
// }

// export default connect(mapStateToProps, {LoginUser})(LoginForm)
export default LoginForm
