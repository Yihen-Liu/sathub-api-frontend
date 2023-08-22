import Head from 'next/head'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import { getPageTitle } from '../config'
import {BitcoinDonation, LightningDonation} from "../components/CardBox/Donation";

const ProfilePage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Profile')}</title>
            </Head>

            <SectionMain>

                <BitcoinDonation className="mb-6" />
                <LightningDonation className="mb-6" />
            </SectionMain>
        </>
    )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage