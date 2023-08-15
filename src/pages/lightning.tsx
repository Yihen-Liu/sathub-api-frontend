import {mdiBallotOutline, mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff} from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBox/Component/Empty'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'

const TablesPage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Lightning')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiBallotOutline} title="Lightning Setting" main>
                </SectionTitleLineWithButton>


            </SectionMain>
        </>
    )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
