import {
    mdiAccount,
    mdiAsterisk,
    mdiFormTextboxPassword,
    mdiMail,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import type { ReactElement } from 'react'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import Divider from '../components/Divider'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBox/Component/Body'
import CardBoxComponentFooter from '../components/CardBox/Component/Footer'
import FormField from '../components/Form/Field'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import {backendSuccessedCode, backendURL, getPageTitle} from '../config'
import axios from "axios";
import {sha256} from "../util/crypto";
import {useAppSelector} from "../stores/hooks";
import {PasswordForm, UserForm} from "../interfaces";
import {useRouter} from "next/router";

const ProfilePage = () => {
    const jwt = useAppSelector((state) => state.main.jwt)
    const email = useAppSelector((state) => state.main.userEmail)
    const name = useAppSelector((state) => state.main.userName)
    const router = useRouter()
    const initialUserForm: UserForm = {
        email: '',
        name: '',
    };

    const initialPasswordForm: PasswordForm = {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
    };

    const handleUserFormSubmit = async(values:UserForm) => {
        if(values.email=="" && values.name==""){
            alert("email or password is empty");
            return
        }
        values.email = values.email==""?email:values.email;
        values.name = values.name==""?name:values.name;
        // 设置请求头，将 JWT 值添加到 Authorization 字段
        const headers = {
            Authorization: `Bearer ${jwt}`
        };
        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"updateProfile",
            params:[values.email, values.name],
            id:new Date().getTime()
        },{headers})
        if(response.data.code==backendSuccessedCode){
            alert("update email and username successed");
            await router.push("/")
        }else{
            alert(response.data.error)
        }
    }

    const handlePasswordFormSubmit = async(values:PasswordForm) => {
        if(values.currentPassword=="" || values.newPassword=="" || values.newPasswordConfirmation==""){
            alert("current or new password is empty");
            return
        }
        if(values.newPassword!=values.newPasswordConfirmation){
            alert("new password is not match");
            return
        }

        // 设置请求头，将 JWT 值添加到 Authorization 字段
        const headers = {
            Authorization: `Bearer ${jwt}`
        };

        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"updatePassword",
            params:[sha256(values.currentPassword,"hex"), sha256(values.newPassword, "hex")],
            id:new Date().getTime()
        },{headers})

        if(response.data.code==backendSuccessedCode){
            alert("update password successed");
            await router.push("/")
        }else{
            alert(response.data.error)
        }
    }

    return (
        <>
            <Head>
                <title>{getPageTitle('Profile')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccount} title="Profile" main />


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col">

                        <CardBox className="flex-1" hasComponentLayout>
                            <Formik initialValues={initialUserForm} onSubmit={handleUserFormSubmit} >
                                <Form className="flex flex-col flex-1">
                                    <CardBoxComponentBody>
                                        <FormField
                                            label="Name"
                                            help="Required. Your name"
                                            labelFor="name"
                                            icons={[mdiAccount]}
                                        >
                                            <Field name="name" id="name" placeholder={name} />
                                        </FormField>
                                        <FormField
                                            label="E-mail"
                                            help="Required. Your e-mail"
                                            labelFor="email"
                                            icons={[mdiMail]}
                                        >
                                            <Field name="email" id="email" placeholder={email} />
                                        </FormField>
                                    </CardBoxComponentBody>
                                    <CardBoxComponentFooter>
                                        <Buttons>
                                            <Button color="contrast" type="submit" label="Submit" />
                                            <Button color="contrast" type="reset" label="Reset" outline />
                                        </Buttons>
                                    </CardBoxComponentFooter>
                                </Form>
                            </Formik>
                        </CardBox>
                    </div>

                    <CardBox hasComponentLayout>
                        <Formik
                            initialValues={initialPasswordForm}
                            onSubmit={handlePasswordFormSubmit}
                        >
                            <Form className="flex flex-col flex-1">
                                <CardBoxComponentBody>
                                    <FormField
                                        label="Current password"
                                        help="Required. Your current password"
                                        labelFor="currentPassword"
                                        icons={[mdiAsterisk]}
                                    >
                                        <Field
                                            name="currentPassword"
                                            id="currentPassword"
                                            type="password"
                                            autoComplete="current-password"
                                        />
                                    </FormField>

                                    <Divider />

                                    <FormField
                                        label="New password"
                                        help="Required. New password"
                                        labelFor="newPassword"
                                        icons={[mdiFormTextboxPassword]}
                                    >
                                        <Field
                                            name="newPassword"
                                            id="newPassword"
                                            type="password"
                                            autoComplete="new-password"
                                        />
                                    </FormField>

                                    <FormField
                                        label="Confirm password"
                                        help="Required. New password one more time"
                                        labelFor="newPasswordConfirmation"
                                        icons={[mdiFormTextboxPassword]}
                                    >
                                        <Field
                                            name="newPasswordConfirmation"
                                            id="newPasswordConfirmation"
                                            type="password"
                                            autoComplete="new-password"
                                        />
                                    </FormField>
                                </CardBoxComponentBody>

                                <CardBoxComponentFooter>
                                    <Buttons>
                                        <Button color="contrast" type="submit" label="Submit" />
                                        <Button color="contrast" type="reset" label="Reset" outline />
                                    </Buttons>
                                </CardBoxComponentFooter>
                            </Form>
                        </Formik>
                    </CardBox>
                </div>
            </SectionMain>
        </>
    )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage
