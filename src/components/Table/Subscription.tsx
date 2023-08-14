import React  from 'react'
import { useSubscribe} from '../../hooks/sampleData'
import { Subscription} from '../../interfaces'
import {useRecoilState} from "recoil";
import {jwtState} from "../../stores/states";

const Subscriptions = () => {
    const [jwt, ] = useRecoilState(jwtState)
   //const jwtToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpdXlpaGVuQGxpdmUuY29tIiwiZXhwIjoxNjkyMDkwOTcwfQ.yoSlSn7Y8H3zrk3KmgNtSbzR4AX6RYZ09gHwpbrcw5I'
    console.log("jwt:", jwt)
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
