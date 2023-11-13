import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function FormCompleteMsg(props) {

    return (
        <React.Fragment>
            {
            props.submitMsg.msg.length > 0 &&
                <React.Fragment>
                    <h1>{props.submitMsg.msg}</h1>
                    {
                        props.submitMsg.state &&
                        <button onClick={() => props.setRedirectHome(true)}>
                            View movie list
                        </button>
                    }

                </React.Fragment>
            }
            {props.redirectHome && <Redirect to='/home' />};
        </React.Fragment>
    )
}

export default FormCompleteMsg;