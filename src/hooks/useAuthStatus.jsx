import {useEffect, useState, useRef} from "react"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../config/firebase.js"

const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    return {loggedIn, checkingStatus}
}

export default useAuthStatus