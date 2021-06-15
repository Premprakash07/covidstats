import React, { useState } from 'react'
import '../css/alert.css'
import CloseIcon from '@material-ui/icons/Close';

function Alert() {

    const [ close, closeAlertaction ] = useState(false)
    var style = {display: 'none'}

    const closeAlert = () => {
        closeAlertaction(!close)
    }

    return (
        <div id='alert' style={close ? style : {display : 'flex'}} className='alert'>
            The content of this website updates every 10 minutes. So, some data may seem incorrect to you. <CloseIcon className='close-icon' onClick={closeAlert} />
        </div>
    )
}

export default Alert
