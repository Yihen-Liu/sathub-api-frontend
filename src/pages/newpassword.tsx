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
import {SignupForm} from "../interfaces";
import {useRouter} from "next/router";

const initialSignupForm: SignupForm = {
    email: '',
    password: '',
    passwordconfirm: '',
};

export default function Error() {
    const router = useRouter()
    const handleSubmit = async(values:SignupForm) => {
        if(values.password==""||values.passwordconfirm==""){
            alert("password or passwordconfirm is empty");
            return
        }
        if(values.password!==values.passwordconfirm){
            alert("password does not match");
            return
        }
        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"updatePassword",
            params:[sha256(values.password,"hex")],
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

            <SectionFullScreen bg="">
                <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                    <Formik initialValues={initialSignupForm} onSubmit={handleSubmit} >
                        <Form>
                            <FormField label="New Password" help="Please enter your new password">
                                <Field name="password" type="password" />
                            </FormField>

                            <FormField
                                label="New Password Confirm"
                                help="Please enter your new password again"
                            >
                                <Field name="passwordconfirm" type="password" />
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
