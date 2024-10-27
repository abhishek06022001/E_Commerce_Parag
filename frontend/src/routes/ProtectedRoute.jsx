import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import Unauthorised from '../pages/Unauthorised';

export const ProtectedRoute = ({ children }) => {
    const { role } = useSelector(state => state.users_store_reducer);
    if (role) {
        return (
            <div>{children}</div>
        )

    } else {
        return <div> <Unauthorised /> </div>
    }

}

