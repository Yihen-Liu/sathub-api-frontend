import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import CardBox from '../components/CardBox'
import LayoutGuest from '../layouts/Guest'
import SectionMain from '../components/Section/Main'
import { StyleKey } from '../interfaces'
import { gradientBgPurplePink, gradientBgDark } from '../colors'
import {appTitle, backendSuccessedCode, backendURL} from '../config'
import { useAppDispatch } from '../stores/hooks'
import { setDarkMode, setStyle } from '../stores/styleSlice'
import SectionFullScreen from '../components/Section/FullScreen'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import FormCheckRadio from '../components/Form/CheckRadio'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import Button from '../components/Button'
import {useJsonRpc} from "../hooks/useJsonRpc";
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

const StyleSelect = () => {
    const dispatch = useAppDispatch()

    //dispatch(setDarkMode(false))

    const styles: StyleKey[] = ['white', 'basic']

    const router = useRouter()

    const handleSubmit = async(values:LoginValue) => {
        //dispatch(setStyle('white'))
        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"login",
            params:[values.email,sha256(values.password,"hex")],
            id:new Date().getTime()
        })
        if(response.data.code==backendSuccessedCode){
            await router.push('/dashboard')
        }else{
            alert(response.data.error)
        }
    }
    return (
        <>
            <Head>
                <title>{appTitle}</title>
            </Head>

            <SectionFullScreen bg="purplePink">
                <h1 className="text-4xl md:text-5xl text-center text-white font-bold mt-12 mb-3 lg:mt-0">
                    Bitcoin-Only Service Provider &nbsp; &nbsp;
                </h1>
                <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form>
                            <FormField label="Email" help="Please enter your email">
                                <Field name="email" />
                            </FormField>

                            <FormField label="Password" help="Please enter your password">
                                <Field name="password" type="password" />
                            </FormField>

                            <FormCheckRadio type="checkbox" label="Remember">
                                <Field type="checkbox" name="remember" />
                            </FormCheckRadio>

                            <Divider />

                            <Buttons>
                                <Button type="submit" label="Login" color="info" />
                                <Button href="/signup" label="Signup" color="info" outline />
                            </Buttons>
                        </Form>
                    </Formik>
                </CardBox>
            </SectionFullScreen>
        </>
    )
}

StyleSelect.getLayout = function getLayout(page: ReactElement) {
    return <LayoutGuest>{page}</LayoutGuest>
}

export default StyleSelect
