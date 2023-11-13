import React, {useState} from 'react';
import createDayPlanAPI from '../api/DayPlanAPI';
import FormCompleteMsg from './FormCompleteMsg'

function CreateDayPlan() {

    const [submitMsg, setSubmitMsg] = useState({ msg: "", state: false });
    const [redirectHome, setRedirectHome] = useState(false);

    const DayPlanHandler = async (plan) => {
        //submit food to backend
        try {
            const data = await createDayPlanAPI(plan);
            console.log(data);
            setSubmitMsg({ msg: 'Selected food added, add another?', state: true });
        } catch (e) {
            console.log(e);
            setSubmitMsg({ msg: "Something went wrong, please try again!", state: false });
        }

    };

    return (
        <React.Fragment>
            <FormCompleteMsg submitMsg={submitMsg} setRedirectHome={setRedirectHome} redirectHome={redirectHome}/>
        </React.Fragment>

    )
}

export default CreateDayPlan;