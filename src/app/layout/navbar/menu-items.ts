export interface MenuItem{
    text: string,
    icon: string,
    path: string,
}

export const menuItems = [
    {
        text: 'Home',
        icon: 'home',
        path: '',
    },
        {
        text: 'Excel to SQL',
        icon: 'grid_on',
        path: '/xlsx-to-sql',
    },
        {
        text: 'Instructions',
        icon: 'info',
        path: '/instructions',
    },
]