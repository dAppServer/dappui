export const APP_MENU_ITEMS: any[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/',
      home: true,
    },
    {
      title: 'Apps',
      icon: 'edit-2-outline',
      link: '/apps',
    },
    {
      title: 'System',
      icon: 'edit-2-outline',
      link: '/system',
    },
    {
      title: 'APPS',
      group: true,
    },
    {
      title: 'Blockchain',
      icon: 'layout-outline',
      children: [
        {
          title: 'Explorer',
          link: '/chain',
        },
        {
          title: 'Wallets',
          link: '/chain/wallet',
        }
      ],
    },
  ];
  