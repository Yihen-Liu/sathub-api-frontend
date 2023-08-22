import CardBox from '.'
import QRCodeSVG from "qrcode.react";
import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import CardBoxComponentBody from "./Component/Body";
import FormField from "../Form/Field";
import CardBoxComponentFooter from "./Component/Footer";
import Buttons from "../Buttons";
import Button from "../Button";
import {InvoiceForm} from "../../interfaces";
import {mdiSquareEditOutline} from "@mdi/js";
import {useAppSelector} from "../../stores/hooks";
import axios from "axios";
import {backendSuccessedCode, backendURL} from "../../config";

type Props = {
    className?: string
}

const initialInvoiceForm: InvoiceForm = {
    amount: "",
};




export const BitcoinDonation = ({ className }: Props) => {
    const btcaddress = useAppSelector((state) => state.main.btcaddress)
        return (
            <CardBox className={className}>
                <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
                    <div className="mb-6 lg:mb-0 lg:mx-12">
                        <QRCodeSVG
                            value={btcaddress}
                            size={200}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={true}
                            imageSettings={{ // 二维码中间的logo图片
                                src: '/sathub/btc-logo.png',
                                height: 35,
                                width: 35,
                                excavate: true, // 中间图片所在的位置是否镂空
                            }}
                        />
                    </div>
                    <div className="space-y-3 text-center md:text-left lg:mx-12">
                            <h1 className="text-l text-center font-bold">
                                Bitcoin Address
                            </h1>
                            <p className="text-l text-center">
                                {btcaddress}
                            </p>
                    </div>
                </div>
            </CardBox>
        )
    }
export const LightningDonation = ({ className }: Props) => {
    const jwt = useAppSelector((state) => state.main.jwt)
    const [invoice, setInvoice] = useState<string>("lnbc100u1pjwfwh9pp580rx6cy5jt5e7t94s28sujcy3336t5l5jdjghc900s3r5g034g6sdqu2askcmr9wssx7e3q2dshgmmndp5scqzzsxqyz5vqsp5g206c9jeen6tt2y5d0uf0v82cn2mzdpkks5qhuqvsz5z8z37f6hs9qyyssqsszpt6kad799wes63sp6n6az7axpxmtlw84kpx4zequru9v4tzkqc6hy70fcythv7wczfa9ns6ua8yqtt7kl0llrcpku04r6xdju8ggqlnvkzv");
    const applyInvoice = async(invoice:InvoiceForm) => {
        // 设置请求头，将 JWT 值添加到 Authorization 字段
        const headers = {
            Authorization: `Bearer ${jwt}`
        };
        if(invoice.amount==""){
            alert("amount is null")
            return
        }

        const response= await axios.post(backendURL,{
            jsonrpc:"2.0",
            method:"applyInvoice",
            params:[invoice.amount],
            id:new Date().getTime()
        }, {headers})
        if(response.data.code==backendSuccessedCode){
            setInvoice(response.data.result)
        }else{
            alert(response.data.error)
        }
    }
    return (
        <CardBox className={className}>
            <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
                <div className="mb-6 lg:mb-0 lg:mx-12">
                    <QRCodeSVG
                        value={invoice}
                        size={200}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={true}
                        imageSettings={{ // 二维码中间的logo图片
                            src: '/sathub/ln-logo.png',
                            height: 35,
                            width: 35,
                            excavate: true, // 中间图片所在的位置是否镂空
                        }}
                    />
                </div>
                <div className="space-y-3 text-center md:text-left lg:mx-12">
                    <Formik
                        initialValues={initialInvoiceForm}
                        onSubmit={applyInvoice}
                    >
                        <Form className="flex flex-col flex-1">
                            <CardBoxComponentBody>
                                <FormField
                                    label="Lightning Customize"
                                    help={invoice.substr(0,20)+"..."+invoice.substr(-20)}
                                    labelFor="amount"
                                    icons={[mdiSquareEditOutline]}
                                >
                                    <Field name="amount" id="amount" placeholder="10000sats default" />
                                </FormField>

                            </CardBoxComponentBody>

                            <CardBoxComponentFooter>
                                <Buttons>
                                    <Button color="contrast" type="submit" label="Generate Invoice" />
                                </Buttons>
                            </CardBoxComponentFooter>
                        </Form>
                    </Formik>
                </div>
            </div>
        </CardBox>
    )
}