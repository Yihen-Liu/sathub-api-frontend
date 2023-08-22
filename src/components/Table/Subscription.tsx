import React  from 'react'
import { useSubscribe} from '../../hooks/sampleData'
import { Subscription} from '../../interfaces'
import {useAppSelector} from "../../stores/hooks";
import {mdiOpenInNew} from "@mdi/js";
import Button from "../Button";

const Subscriptions = () => {
    const jwt = useAppSelector((state) => state.main.jwt)
    const { subscriptions } = useSubscribe(jwt)
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className='text-center'>Subscription</th>
                        <th className='text-center'>Working URL</th>
                        <th className='text-center'>End Time</th>
                        <th className='text-center'>Upgrade</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions?.map((subscription: Subscription) => (
                        <tr key={subscription.mode}>
                            <td data-label="mode">{subscription.mode}</td>
                            <td data-label="url">{subscription.url}</td>
                            <td data-label="endtime">{subscription.endtime}</td>
                            <td data-label="upgrade">
{/*
                                <a href="https://github.com/bitcoin/bitcoin/blob/master/doc/REST-interface.md" target="_blank">Upgrade</a>
*/}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    className="center"
                                    color="contrast"
                                    icon={mdiOpenInNew}
                                    outline={true}
                                    roundedFull={true}
                                    onClick={()=>{alert("forbidden now")}}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Subscriptions
