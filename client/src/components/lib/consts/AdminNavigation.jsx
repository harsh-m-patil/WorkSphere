import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '',
    icon: <HiOutlineViewGrid />,
  },
  {
    key: 'manage-clients',
    label: 'Manage Clients',
    path: 'ManageClients',
    icon: <HiOutlineCube />,
  },
  {
    key: 'manage-users',
    label: 'Manage Freelancers ',
    path: 'ManageUsers',
    icon: <HiOutlineUsers />,
  },
  {
    key: 'manage-jobs',
    label: 'Manage Jobs',
    path: 'ManageJobs',
    icon: <HiOutlineUsers />,
  },
  // {
  // 	key: 'transactions',
  // 	label: 'Transactions',
  // 	path: '/transactions',
  // 	icon: <HiOutlineDocumentText />
  // },
  {
    key: 'analytics',
    label: 'Analytics',
    path: 'Analytics',
    icon: <HiOutlineAnnotation />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: 'settings',
    icon: <HiOutlineCog />,
  },
  {
    key: 'support',
    label: 'Help & Support',
    path: 'support',
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
