import React from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import FormCheckRadio from '../components/Form/CheckRadio'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import { useRouter } from 'next/router'
import {backendSuccessedCode, backendURL, getPageTitle} from '../config'
import axios from "axios";
import {sha256} from "../util/crypto";

interface LoginValue {
    email: string;
    password: string;
}
const initialValues: LoginValue = {
    email: '',
    password: '',
};
export default function Error() {
    const router = useRouter()
    const handleSubmit = async(values:LoginValue) => {
        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"login",
            params:[values.email,sha256(values.password, "hex")],
            id:new Date().getTime()
        })
        if(response.data.code===backendSuccessedCode){
            await router.push('/dashboard')
        }else{
            alert(response.data.error)
        }
    }

    return (
        <>
            <Head>
                <title>{getPageTitle('Login')}</title>
            </Head>

            <SectionFullScreen bg="purplePink">
                <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form>
                            <FormField label="Login" help="Please enter your email login">
                                <Field name="email" id="email"/>
                            </FormField>

                            <FormField label="Password" help="Please enter your password">
                                <Field name="password" id="password" type="password" />
                            </FormField>

                            <FormCheckRadio type="checkbox" label="Remember">
                                <Field type="checkbox" name="remember" />
                            </FormCheckRadio>

                            <Divider />

                            <Buttons>
                                <Button type="submit" label="Login" color="info" />
                                <Button href="/dashboard" label="Home" color="info" outline />
                            </Buttons>
                        </Form>
                    </Formik>
                </CardBox>
            </SectionFullScreen>
        </>
    )
}

Error.getLayout = function getLayout(page: ReactElement) {
    return <LayoutGuest>{page}</LayoutGuest>
}
