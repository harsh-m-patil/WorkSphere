import { UsersIcon, UserIcon } from '@heroicons/react/outline'; // Importing icons
import ClientSideBarElement from './ClientSideBarElement';

const ClientSideBar = ({ client }) => {
  return (
    <div className="sticky top-0 hidden h-screen w-80 bg-gray-900 px-5 py-16 text-xl text-gray-200 md:block">
      <p className="mb-10 rounded-[40px] border border-teal-400 bg-teal-900 py-2 text-center text-3xl font-medium">
        <span className="font-semibold text-teal-300">WorkSphere</span>.
      </p>
      <ul>
        <ClientSideBarElement
          text={'Profile'}
          to="/client/dashboard"
          icon={<UserIcon className="h-5 w-5" />}
          client={client}
        />
        <ClientSideBarElement
          text={'My Works'}
          to="/client/dashboard/works"
          icon={<UsersIcon className="h-5 w-5" />}
          client={client}
        />
        <ClientSideBarElement
          text={'Post work'}
          to="/client/dashboard/postwork"
          icon={<UsersIcon className="h-5 w-5" />}
          client={client}
        />
      </ul>
    </div>
  );
};

export default ClientSideBar;
