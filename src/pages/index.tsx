import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import CardBox from '../components/CardBox'
import LayoutGuest from '../layouts/Guest'
import {appTitle, backendSuccessedCode, backendURL} from '../config'
import SectionFullScreen from '../components/Section/FullScreen'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import Button from '../components/Button'
import axios from "axios";
import {sha256} from "../util/crypto";
import {LoginForm} from "../interfaces";

const initialLoginForm: LoginForm = {
    email: '',
    password: '',
};

const StyleSelect = () => {
    const router = useRouter()

    const handleSubmit = async(values:LoginForm) => {
        if(values.email=="" || values.password==""){
            alert("email or password is null")
            return
        }
        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"login",
            params:[values.email,sha256(values.password,"hex")],
            id:new Date().getTime()
        })
        if(response.data.code==backendSuccessedCode){
            localStorage.setItem("sathub-jwt-key",response.data.result.token)
            localStorage.setItem("sathub-user-name", response.data.result.username)
            localStorage.setItem("sathub-user-email",values.email)
            localStorage.setItem("sathub-donate-btcaddress", response.data.result.btcaddress)
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

            <SectionFullScreen bg="white">
                <h1 className="text-6xl md:text-6xl text-center text-black font-bold mt-12 mb-3 lg:mt-0">
                    Bitcoin Only Service Provider &nbsp; &nbsp;
                </h1>
                <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                    <Formik initialValues={initialLoginForm} onSubmit={handleSubmit}>
                        <Form>
                            <FormField label="Email" help="Please enter your email">
                                <Field name="email" />
                            </FormField>

                            <FormField label="Password" help="Please enter your password">
                                <Field name="password" type="password" />
                            </FormField>

                            <a href="/sathub/forget" target="_blank" className="text-gray-500">
                                Forget Your Password?
                            </a>
                            <Divider />

                            <Buttons>
                                <Button type="submit" label="Login" color="contrast" />
                                <Button href="/signup" label="Signup" color="contrast" outline />
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
