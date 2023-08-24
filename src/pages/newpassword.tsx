import React from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import {backendSuccessedCode, backendURL, getPageTitle} from '../config'
import axios from "axios";
import {sha256} from "../util/crypto";
import {ResetForm} from "../interfaces";
import {useRouter} from "next/router";

const initialResetForm: ResetForm = {
    email: '',
    password: '',
    confirmpassword: '',
    code:'',
};

export default function Error() {
    const router = useRouter()
    const handleSubmit = async(values:ResetForm) => {
        if(values.password==""||values.confirmpassword==""){
            alert("password or passwordconfirm is invalid");
            return
        }
        if(values.password!==values.confirmpassword){
            alert("password does not match");
            return
        }
        if(values.code=="" || values.code.length!=6){
            alert("confirm code is invalid");
            return
        }

        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"doResetPassword",
            params:[router.query.email,sha256(values.password,"hex"), values.code, router.query.token],
            id:new Date().getTime()
        })
        if(response.data.code==backendSuccessedCode){
            alert("update password successed");
            await router.push("/");
        }else{
            alert(response.data.error)
        }
    }

    return (
        <>
            <Head>
                <title>{getPageTitle('Signup')}</title>
            </Head>

            <SectionFullScreen bg="white">
                <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                    <Formik initialValues={initialResetForm} onSubmit={handleSubmit} >
                        <Form>
                            <FormField label="New Password" help="Please enter your new password">
                                <Field name="password" type="password" />
                            </FormField>

                            <FormField
                                label="New Password Confirm"
                                help="Please enter your new password again"
                            >
                                <Field name="confirmpassword" type="password" />
                            </FormField>
                            <FormField
                                label="Confirm Code"
                                help="Please enter your confirm code sent by email"
                            >
                                <Field name="code" type="text" />
                            </FormField>

                            <Divider />

                            <Buttons>
                                <Button type="submit" label="Submit" color="contrast" />
                                <Button href="/" label="Home" color="contrast" outline />
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
