import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../components/CardBox'
import LayoutGuest from '../layouts/Guest'
import {backendSuccessedCode, backendURL, getPageTitle} from '../config'
import SectionFullScreen from '../components/Section/FullScreen'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import Button from '../components/Button'
import axios from "axios";
import {ResetForm} from "../interfaces";

const initialResetForm: ResetForm = {
    email: '',
    password: '',
};

const StyleSelect = () => {
    const handleSubmit = async(values:ResetForm) => {
        if(values.email==""){
            alert("email is null")
            return
        }

        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"applyResetPassword",
            params:[values.email],
            id:new Date().getTime()
        })
        if(response.data.code==backendSuccessedCode){
            alert("reset email has been sent to "+values.email);
        }else{
            alert(response.data.error)
        }
    }
    return (
        <>
            <Head>
                <title>{getPageTitle('Forget')}</title>
            </Head>

            <SectionFullScreen bg="white">
                <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                    <Formik initialValues={initialResetForm} onSubmit={handleSubmit}>
                        <Form>
                            <FormField label="Email" help="Please enter your email to reset password">
                                <Field name="email" />
                            </FormField>

                            <Divider />

                            <Buttons>
                                <Button type="submit" label="Send" color="contrast" />
                                <Button href="/" label="Home" color="contrast" outline />
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
