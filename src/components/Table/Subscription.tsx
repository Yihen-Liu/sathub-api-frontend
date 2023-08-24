import React, {useState} from 'react'
import {useSubscribe, useSubscribeHistory} from '../../hooks/sampleData'
import {Subscription} from '../../interfaces'
import {useAppSelector} from "../../stores/hooks";
import {mdiHistory, mdiOpenInNew} from "@mdi/js";
import Button from "../Button";
import Buttons from "../Buttons";
import SectionTitleLineWithButton from "../Section/TitleLineWithButton";
import CardBox from "../CardBox";

export const Subscriptions = () => {
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
                        <tr key={subscription.id}>
                            <td data-label="mode">{subscription.mode}</td>
                            <td data-label="url">{subscription.url}</td>
                            <td data-label="endtime">{subscription.endtime}</td>
                            <td data-label="upgrade">
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

export const SubscriptionHistory = () => {
    const jwt = useAppSelector((state) => state.main.jwt)
    const { subscriptions } = useSubscribeHistory(jwt)
    const perPage =5

    const [currentPage, setCurrentPage] = useState(0)

    const subscriptionsPaginated = subscriptions?.slice(perPage * currentPage, perPage * (currentPage + 1))

    const numPages = subscriptions?.length / perPage

    const pagesList = []

    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)

    const handleModalAction = () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)
    }
    if(subscriptions?.length==0){
        return <></>
    }


    return (
        <>
            <SectionTitleLineWithButton icon={mdiHistory} title="History" main> </SectionTitleLineWithButton>
            <CardBox hasTable>

            <table>
                <thead>
                <tr>
                    <th className="text-center text-gray-500">Subscription</th>
                    <th className="text-center text-gray-500">Working URL</th>
                    <th className="text-center text-gray-500">End Time</th>
                    <th className="text-center text-gray-500">Reuse</th>
                </tr>
                </thead>
                <tbody>
                {subscriptionsPaginated?.map((subscription: Subscription) => (
                    <tr key={subscription.id}>
                        <td data-label="mode" className="text-gray-500">{subscription.mode}</td>
                        <td data-label="url" className="text-gray-500">{subscription.url}</td>
                        <td data-label="endtime" className="text-gray-500">{subscription.endtime}</td>
                        <td data-label="reuse">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                                className="center bg-gray-100"
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
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <Buttons>
                        {pagesList.map((page) => (
                            <Button
                                key={page}
                                active={page === currentPage}
                                label={page + 1}
                                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                                small
                                onClick={() => setCurrentPage(page)}
                            />
                        ))}
                    </Buttons>
                    <small className="mt-6 md:mt-0">
                        Page {currentPage + 1} of {numPages>=1?numPages:1}
                    </small>
                </div>
            </div>
            </CardBox>
        </>
)
}
