import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

//NOTE: Should be an array but to use react hooks made a function that returns a array
export const columns = (cancelApplicationHandler, viewApplicationDetails) => [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.getValue('title');
      return <p className="text-base font-medium">{title}</p>;
    },
  },
  {
    accessorKey: 'noOfAppl',
    header: ({ column }) => (
      <div className="flex w-full justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="mx-auto"
        >
          No Of Applications
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <p className="text-center">{row.getValue('noOfAppl')}</p>
    ),
  },
  {
    accessorKey: 'postedBy',
    header: 'Posted By',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div
          className={`inline-block whitespace-nowrap rounded-full border px-2 py-1 text-xs md:px-4 md:text-base ${getStatusClass(
            status
          )}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: 'pay',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Pay
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('pay'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    header: <div>Actions</div>,
    cell: ({ row }) => {
      const application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(application._id);
                toast.success('Copied Application ID', {
                  position: 'top-left',
                });
              }}
            >
              Copy Application ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => viewApplicationDetails(application._id)}
            >
              View Application
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => cancelApplicationHandler(application._id)}
              className="border border-red-400 bg-red-100 hover:bg-red-200"
            >
              Cancel Application
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'accepted':
      return 'bg-green-100 text-green-700 border-green-500 font-semibold';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-500 font-semibold';
    case 'rejected':
      return 'bg-red-100 text-red-700 border-red-500 font-semibold';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-500 font-semibold';
  }
};
