import {
    mdiAccountMultiple,
    mdiCartOutline,
    mdiChartTimelineVariant,
} from '@mdi/js'
import Head from 'next/head'
import React  from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBoxWidget from '../components/CardBox/Widget'
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
import CardBoxTransaction from '../components/CardBox/Transaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/CardBox/Client'
import CardBox from '../components/CardBox'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'

const Dashboard = () => {
    const { clients } = useSampleClients()
    const { transactions } = useSampleTransactions()

    const clientsListed = clients.slice(0, 4)

    return (
        <>
            <Head>
                <title>{getPageTitle('Dashboard')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Overview" main>
                </SectionTitleLineWithButton>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                    <CardBoxWidget
                        trendLabel="12%"
                        trendType="up"
                        trendColor="success"
                        icon={mdiAccountMultiple}
                        iconColor="success"
                        number={512}
                        label="Clients"
                    />
                    <CardBoxWidget
                        trendLabel="16%"
                        trendType="down"
                        trendColor="danger"
                        icon={mdiCartOutline}
                        iconColor="info"
                        number={7770}
                        numberPrefix="$"
                        label="Sales"
                    />
                    <CardBoxWidget
                        trendLabel="Overflow"
                        trendType="warning"
                        trendColor="warning"
                        icon={mdiChartTimelineVariant}
                        iconColor="danger"
                        number={256}
                        numberSuffix="%"
                        label="Performance"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col justify-between">
                        {transactions.map((transaction: Transaction) => (
                            <CardBoxTransaction key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                    <div className="flex flex-col justify-between">
                        {clientsListed.map((client: Client) => (
                            <CardBoxClient key={client.id} client={client} />
                        ))}
                    </div>
                </div>

                <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

                <CardBox hasTable>
                    <TableSampleClients />
                </CardBox>
            </SectionMain>
        </>
    )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
