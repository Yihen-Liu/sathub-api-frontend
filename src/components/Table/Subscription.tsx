import React  from 'react'
import { useSubscribe} from '../../hooks/sampleData'
import { Subscription} from '../../interfaces'
import {useAppSelector} from "../../stores/hooks";

const Subscriptions = () => {
    const jwt = useAppSelector((state) => state.main.jwt)
    const { subscriptions } = useSubscribe(jwt)
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Subscription</th>
                        <th>Working URL</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions?.map((subscription: Subscription) => (
                        <tr key={subscription.mode}>
                            <td data-label="mode">{subscription.mode}</td>
                            <td data-label="url">{subscription.url}</td>
                            <td data-label="endtime">{subscription.endtime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Subscriptions
