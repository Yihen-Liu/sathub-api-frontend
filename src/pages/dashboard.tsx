import { mdiSquareEditOutline } from '@mdi/js'
import Head from 'next/head'
import React  from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBox from '../components/CardBox'
import { getPageTitle } from '../config'

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Dashboard')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiSquareEditOutline} title="Abstract" main />

                <CardBox>
                        <p> As the Bitcoin block increases, the disk capacity of the Bitcoin full node will continue to increase; for an ordinary developer, the pressure to build a full node will increase, especially the storage space; for the convenience of developers, you can Quickly use Bitcoin for ecological construction, we have launched the Bitcoin ecological gateway service; </p>
                        <br/>
                        <p> Currently, sathub provides four types of services, namely: Jsonrpc, Restful, Zmq, Wss; after the developer registers and logs in, he only needs to apply for the corresponding service access token, through access token, use our service as if you have a complete local full node; </p>
                </CardBox>
                <SectionTitleLineWithButton icon={mdiSquareEditOutline} title="Usage" />

                <CardBox>
                    <p>
                        1. Through the selection bar on the left, you can enter the testnet/mainnet/lightning service application page;
                    </p>
                    <br/>
                    <p>
                        2. You can set the access token you applied for according to your needs, such as network, service category, and service time;
                    </p>
                    <br/>
                    <p>
                        3. When you are successful, refresh the page, and the page will display the access token assigned to you by the system;
                    </p>
                    <br/>
                    <p>
                        * Note that only testnet services are currently available;
                    </p>
                </CardBox>

                <SectionTitleLineWithButton icon={mdiSquareEditOutline} title="Roadmap" />

                <CardBox>
                        <p>
                            1. In the first stage, sathub will provide gateway services for the Bitcoin test network;
                        </p>
                        <br/>
                        <p>
                            2. In the second stage, sathub will provide the gateway service of the Bitcoin mainnet;
                        </p>
                        <br/>
                        <p>
                            3. In the third stage, sathub will provide lightning network gateway services;
                        </p>
                </CardBox>
            </SectionMain>
        </>
    )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
