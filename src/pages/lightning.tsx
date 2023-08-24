import {mdiBallotOutline} from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
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
