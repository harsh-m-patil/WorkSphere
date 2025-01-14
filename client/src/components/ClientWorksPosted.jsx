import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BadgeCheck, Briefcase, Search, SlidersHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { API_URL } from '../utils/constants';
import ClientSideBar from './ClientSideBar';

export default function ClientWorksPosted() {
  const location = useLocation();
  const navigate = useNavigate();
  const { client } = location.state || {};

  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    async function fetchClientWorks() {
      try {
        setIsLoading(true);
        const response = await axios.post(`${API_URL}/work/myworks`, {
          clientId: client._id,
        });
        setWorks(response.data.data.works);
        setFilteredWorks(response.data.data.works);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (client?._id) {
      fetchClientWorks();
    }
  }, [client]);

  useEffect(() => {
    let result = [...works];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (work) =>
          work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          work.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((work) =>
        statusFilter === 'active' ? work.active : !work.active
      );
    }

    // Apply level filter
    if (levelFilter !== 'all') {
      result = result.filter((work) => work.joblevel === levelFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'mostApplied':
          return b.applied_status.length - a.applied_status.length;
        case 'leastApplied':
          return a.applied_status.length - b.applied_status.length;
        default:
          return 0;
      }
    });

    setFilteredWorks(result);
  }, [works, searchQuery, statusFilter, levelFilter, sortBy]);

  const handleGoIn = (work) => {
    navigate('/client/dashboard/works/single', {
      state: { work },
    });
  };

  if (error) {
    return (
      <div className="bg-background flex min-h-screen">
        <ClientSideBar client={client} />
        <div className="flex-1 p-6">
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive">
                Error Loading Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen">
      <ClientSideBar client={client} />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Posted Works</h1>
            <p className="text-muted-foreground">
              Manage your posted jobs and view applications
            </p>
          </div>
          <Button onClick={() => navigate('/client/dashboard/works/new')}>
            <Briefcase className="mr-2 h-4 w-4" />
            Post New Work
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
            <Input
              placeholder="Search works..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Works</SheetTitle>
                <SheetDescription>
                  Adjust filters to find specific works
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Level</label>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Entry">Entry</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort works" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="mostApplied">Most Applied</SelectItem>
                      <SelectItem value="leastApplied">
                        Least Applied
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredWorks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Briefcase className="text-muted-foreground h-10 w-10" />
              <h3 className="mt-4 text-lg font-semibold">No Works Found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your filters or post a new work.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => (
              <Card
                key={work._id}
                className="cursor-pointer transition-shadow hover:shadow-lg"
                onClick={() => handleGoIn(work)}
              >
                <CardHeader>
                  <CardTitle>{work.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {work.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Level:
                    </span>
                    <Badge variant="outline">{work.joblevel}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Pay:</span>
                    <Badge variant="secondary">${work.pay}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {work.skills_Required.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BadgeCheck
                      className={
                        work.active ? 'text-primary' : 'text-muted-foreground'
                      }
                    />
                    <span
                      className={`text-sm ${work.active ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      {work.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <Badge>{work.applied_status.length} Applied</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
