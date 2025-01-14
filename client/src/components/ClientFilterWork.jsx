'use client';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BadgeCheck, Mail, Star, Users } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { API_URL } from '../utils/constants';

export default function ClientFilterWork() {
  const location = useLocation();
  const { work } = location.state || {};
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    async function fetchAppliedUsers() {
      try {
        setIsLoading(true);
        const response = await axios.post(`${API_URL}/work/getUsersForWork`, {
          workId: work._id,
        });
        setAppliedUsers(response.data.data.workdetails.applied_status);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load applicants');
      } finally {
        setIsLoading(false);
      }
    }

    if (work?._id) {
      fetchAppliedUsers();
    }
  }, [work]);

  const handleAssign = async (user) => {
    try {
      setIsAssigning(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      await axios.post(
        `${API_URL}/work/assign`,
        {
          workId: work._id,
          freelancerId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Work assigned to ${user.userName}`);
      setSelectedUser(null);
    } catch (err) {
      toast.error('Failed to assign work');
      console.error(err);
    } finally {
      setIsAssigning(false);
    }
  };

  if (error) {
    return (
      <Card className="mx-auto mt-12 max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">
            Error Loading Work Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Job Details Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>{work.title}</CardTitle>
              <CardDescription>Job Details and Requirements</CardDescription>
            </div>
            <Badge variant={work.active ? 'default' : 'secondary'}>
              <BadgeCheck className="mr-1 h-4 w-4" />
              {work.active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">{work.description}</p>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">Level</p>
              <Badge variant="outline">{work.joblevel}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Pay</p>
              <Badge variant="secondary">${work.pay}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Required Skills</p>
              <div className="flex flex-wrap gap-1">
                {work.skills_Required.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applicants Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Applicants</h2>
          <Badge variant="outline" className="text-sm">
            {appliedUsers.length} Total
          </Badge>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : appliedUsers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Users className="text-muted-foreground h-10 w-10" />
              <h3 className="mt-4 text-lg font-semibold">No Applicants Yet</h3>
              <p className="text-muted-foreground text-sm">
                When freelancers apply to this job, they'll appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {appliedUsers.map((user) => (
              <Card key={user._id}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback>{user.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-base">
                        {user.userName}
                      </CardTitle>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        <span className="text-muted-foreground text-sm">
                          {user.ratingsAverage} ({user.noOfRatings} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground text-sm">
                      {user.email}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-green-300 to-green-400 text-slate-800"
                        onClick={() => setSelectedUser(user)}
                      >
                        Assign Work
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Assign Work to {user.userName}
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to assign this work to{' '}
                          {user.userName}? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedUser(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleAssign(user)}
                          disabled={isAssigning}
                        >
                          {isAssigning ? 'Assigning...' : 'Confirm Assignment'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
