export const MyWorksListElement = ({ appl }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-3">{appl._id}</td>
      <td className="border border-gray-300 px-4 py-3">{appl.title}</td>
      <td className="border border-gray-300 px-4 py-3">₹{appl.pay}</td>
      <td className="border border-gray-300 px-4 py-3">
        {appl.client_id.userName}
      </td>
      <td className="p-x-3 p-y-2 border border-gray-300 text-center">
        <span
          className={`rounded-xl border border-dashed px-4 py-1 text-center`}
        >
          {appl.joblevel}
        </span>
      </td>
    </tr>
  );
};
