'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Award,
  Briefcase,
  Clock,
  ExternalLink,
  Mail,
  Pencil,
  User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchLoggedInUser } from '../query/fetchLoggedInUser';

export default function ProfileDashboard() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['me'],
    queryFn: fetchLoggedInUser,
    staleTime: 60 * 1000,
  });

  if (isPending) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <div className="grid gap-8 lg:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-[150px]" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background pb-16 pt-12">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Professional Profile
          </h1>
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personal Information</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p>{`${data.firstName} ${data.lastName}`}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Username</p>
                <p>{data.userName}</p>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Contact Details</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p>{data.email}</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">About</p>
                <p className="mt-2 whitespace-pre-line text-muted-foreground">
                  {data.description || 'No description provided'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Expertise */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Professional Expertise</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.length > 0 ? (
                    data.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No skills listed yet
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.languages.length > 0 ? (
                    data.languages.map((lang, index) => (
                      <Badge key={index} variant="outline">
                        {lang}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No languages listed yet
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications & Achievements */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Certifications & Achievements</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {data.certificates.length > 0 ? (
                <div className="space-y-3">
                  {data.certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
                    >
                      <div className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span>{cert}</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed p-6 text-center">
                  <Award className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 font-medium">No certificates added yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add your professional certifications and achievements
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
