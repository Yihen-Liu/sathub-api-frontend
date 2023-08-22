import { mdiBallotOutline} from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import Divider from '../components/Divider'
import CardBox from '../components/CardBox'
import FormField from '../components/Form/Field'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import {backendSuccessedCode, backendURL, getPageTitle} from '../config'
import axios from "axios";

interface SubMode {
    mode: string;
    duration: string;
    network:string
}
const initialValues: SubMode = {
    mode: 'jsonrpc',
    duration: 'weekly',
    network:'bitcoin'
};
const enable=0
const TablesPage= () => {
    const handleSubmit = async(sub:SubMode) => {
        if(enable==0){
            alert("mainnet coming soooooooooooooon")
            return
        }
        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"apply",
            params:[sub.mode,sub.duration, sub.network],
            id:new Date().getTime()
        })
        if(response.data.code==backendSuccessedCode){
            alert("apply successed");
        }else{
            alert(response.data.error);
        }
    }


    return (
        <>
            <Head>
                <title>{getPageTitle('Mainnet')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiBallotOutline} title="Mainnet Subscription" main> </SectionTitleLineWithButton>
                <table>
                    <thead>
                    <tr>
                        <th>&nbsp; &nbsp; &nbsp; Subscribe Mode</th>
                        <th>Effective Duration</th>
                        <th>Network</th>
                    </tr>
                    </thead>
                </table>
                <CardBox>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                        <Form>
                            <FormField >
                                <Field name="mode" id="mode" component="select">
                                    <option value="jsonrpc">JSONRPC</option>
                                    <option value="wss">WSS</option>
                                    <option value="zmq">ZMQ</option>
                                    <option value="restful">RESTFUL</option>
                                </Field>
                                <Field name="duration" id="duration" component="select">
                                    <option value="weekly">Weekly</option>
                                    <option value="month">Month</option>
                                    <option value="yearly">Yearly</option>
                                </Field>

                                <Field name="network" id="network" component="select">
                                    <option value="bitcoin">Bitcoin Mainnet</option>
                                </Field>
                            </FormField>
                            <Buttons>
                                <Button type="submit" color="contrast" label="Apply Plan" />
                            </Buttons>

                            <Divider />
                        </Form>
                    </Formik>
                </CardBox>

                <CardBox className="mb-6" hasTable>
{/*
                    <Subscriptions />
*/}

                    <table>
                        <thead>
                        <tr>
                            <th className='text-center'>Subscription</th>
                            <th className='text-center'>Working URL</th>
                            <th className='text-center'>End Time</th>
                            <th className='text-center'>Upgrade</th>
                        </tr>
                        </thead>
                    </table>
                </CardBox>
            </SectionMain>
        </>
    )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
