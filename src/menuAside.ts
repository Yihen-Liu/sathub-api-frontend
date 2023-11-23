import {
    mdiAccountCircle, mdiCoffee,
    mdiMonitor,
    mdiTable,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
    {
        href: '/dashboard',
        icon: mdiMonitor,
        label: 'Dashboard',
    },
    {
        href: '/testnet',
        label: 'Testnet',
        icon: mdiTable,
    },
    {
        href: '/mainnet',
        label: 'Mainnet',
        icon: mdiTable,
    },
/*
    {
        href: '/lightning',
        label: 'Lightning',
        icon: mdiTable,
    },
*/
    {
        href: '/profile',
        label: 'Profile',
        icon: mdiAccountCircle,
    },
    {
        href: '/donate',
        label: 'Donate',
        icon: mdiCoffee,
    },
]

export default menuAside
