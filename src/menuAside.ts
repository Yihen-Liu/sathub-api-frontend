import {
    mdiAccountCircle,
    mdiMonitor,
    mdiSquareEditOutline,
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
        href: '/mainnet',
        label: 'Mainnet',
        icon: mdiTable,
    },
    {
        href: '/testnet',
        label: 'Testnet',
        icon: mdiSquareEditOutline,
    },
    {
        href: '/lightning',
        label: 'Lightning',
        icon: mdiSquareEditOutline,
    },
    {
        href: '/profile',
        label: 'Profile',
        icon: mdiAccountCircle,
    },
]

export default menuAside
