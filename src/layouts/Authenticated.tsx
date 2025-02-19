import React, { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import menuAside from '../menuAside'
import menuNavBar from '../menuNavBar'
import Icon from '../components/Icon'
import NavBar from '../components/NavBar'
import NavBarItemPlain from '../components/NavBar/Item/Plain'
import AsideMenu from '../components/AsideMenu'
import FooterBar from '../components/FooterBar'
import { setUser } from '../stores/mainSlice'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { useRouter } from 'next/router'

type Props = {
    children: ReactNode
}

export default function LayoutAuthenticated({ children }: Props) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(
            setUser({
                name: localStorage.getItem("sathub-user-name"),
                email: localStorage.getItem("sathub-user-email"),
                jwt: localStorage.getItem("sathub-jwt-key"),
                btcaddress:localStorage.getItem("sathub-donate-btcaddress")
            })
        )
    })

    const darkMode = useAppSelector((state) => state.style.darkMode)

    const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false)
    const [isAsideLgActive, setIsAsideLgActive] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setIsAsideMobileExpanded(false)
            setIsAsideLgActive(false)
        }

        router.events.on('routeChangeStart', handleRouteChangeStart)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart)
        }
    }, [router.events, dispatch])

    const layoutAsidePadding = 'xl:pl-60'

    return (
        <div className={`${darkMode ? 'dark' : ''} overflow-hidden lg:overflow-visible`}>
            <div
                className={`${layoutAsidePadding} ${
                    isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''
                } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100`}
            >
                <NavBar
                    menu={menuNavBar}
                    className={`${layoutAsidePadding} ${
                        isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''
                    }`}
                >
                    <NavBarItemPlain
                        display="flex lg:hidden"
                        onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
                    >
                        <Icon
                            path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger}
                            size="24"
                        />
                    </NavBarItemPlain>
                    <NavBarItemPlain
                        display="hidden lg:flex xl:hidden"
                        onClick={() => setIsAsideLgActive(true)}
                    >
                        <Icon path={mdiMenu} size="24" />
                    </NavBarItemPlain>
                    {/*
          <NavBarItemPlain useMargin>
            <Formik
              initialValues={{
                search: '',
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form>
                <FormField isBorderless isTransparent>
                  <Field name="search" placeholder="Search" />
                </FormField>
              </Form>
            </Formik>
          </NavBarItemPlain>
*/}
                </NavBar>
                <AsideMenu
                    isAsideMobileExpanded={isAsideMobileExpanded}
                    isAsideLgActive={isAsideLgActive}
                    menu={menuAside}
                    onAsideLgClose={() => setIsAsideLgActive(false)}
                />
                {children}
                <FooterBar>
                    contract with{` `}
                    <a
                        href="mailto:hello@sathub.io"
                        target="_blank"
                        className="text-blue-500"
                    >
                        Hello@sathub.io
                    </a>
                    ,&nbsp;join in{` `}
                    <a
                        href="https://discord.gg/PPB8jRXTzP"
                        target="_blank"
                        className="text-blue-500"
                    >
                      Discord
                    </a>
                    ,&nbsp;feedback by{` `}
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdEhGAOvRqpApwm4BDsWnkSi-dpMM-kjuu12d0nK0FzckWprw/viewform?usp=sf_link"
                        target="_blank"
                        className="text-blue-500"
                    >
                        Forms
                    </a>
                </FooterBar>
            </div>
        </div>
    )
}
