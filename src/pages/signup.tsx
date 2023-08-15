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
import {backendSuccessedCode, backendURL, getPageTitle} from '../config'
import axios from "axios";
import {sha256} from "../util/crypto";

interface SignupValue {
    email: string;
    password: string;
    passwordconfirm: string;
}
const initialValues: SignupValue = {
    email: '',
    password: '',
    passwordconfirm: '',
};

export default function Error() {
    const handleSubmit = async(values:SignupValue) => {
        if(values.email=="" || values.password==""||values.passwordconfirm==""){
            alert("email or password is empty");
            return
        }
        if(values.password!==values.passwordconfirm){
            alert("password does not match");
            return
        }
        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"signup",
            params:[values.email, sha256(values.password,"hex")],
            id:new Date().getTime()
        })
        if(response.data.code==backendSuccessedCode){
            alert("please check your "+values.email+ " inbox");
            //await router.push('/dashboard')
        }else{
            alert(response.data.error)
        }
    }

    return (
        <>
            <Head>
                <title>{getPageTitle('Signup')}</title>
            </Head>

            <SectionFullScreen bg="purplePink">
                <h1 className="text-4xl md:text-5xl text-center text-white font-bold mt-12 mb-3 lg:mt-0">
                    Bitcoin-Only Service Provider &nbsp; &nbsp;
                </h1>
                <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                        <Form>
                            <FormField label="Email" help="Please enter your email">
                                <Field name="email" />
                            </FormField>

                            <FormField label="Password" help="Please enter your password">
                                <Field name="password" type="password" />
                            </FormField>

                            <FormField
                                label="Password Confirm"
                                help="Please enter your password again"
                            >
                                <Field name="passwordconfirm" type="password" />
                            </FormField>

                            <FormCheckRadio type="checkbox" label="Remember">
                                <Field type="checkbox" name="remember" />
                            </FormCheckRadio>

                            <Divider />

                            <Buttons>
                                <Button type="submit" label="Signup" color="info" />
                                <Button href="/" label="Home" color="info" outline />
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
