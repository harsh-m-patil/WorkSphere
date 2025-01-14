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
      <div className="bg-background min-h-screen pb-16">
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
      <div className="bg-background flex min-h-screen items-center justify-center">
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
    <div className="bg-background min-h-screen w-full pb-16 pt-12">
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
                <div className="bg-primary/10 rounded-lg p-2">
                  <User className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Personal Information</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Full Name</p>
                <p>{`${data.firstName} ${data.lastName}`}</p>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Username</p>
                <p>{data.userName}</p>
              </div>
              <div className="text-muted-foreground flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4" />
                Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Contact Details</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Email Address</p>
                <p>{data.email}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium">About</p>
                <p className="text-muted-foreground mt-2 whitespace-pre-line">
                  {data.description || 'No description provided'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Expertise */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Briefcase className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Professional Expertise</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">
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
                    <p className="text-muted-foreground text-sm">
                      No skills listed yet
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">
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
                    <p className="text-muted-foreground text-sm">
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
                <div className="bg-primary/10 rounded-lg p-2">
                  <Award className="text-primary h-6 w-6" />
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
                      className="hover:bg-muted flex items-center justify-between rounded-lg border p-4 transition-colors"
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
                  <Award className="text-muted-foreground mx-auto h-8 w-8" />
                  <p className="mt-2 font-medium">No certificates added yet</p>
                  <p className="text-muted-foreground mt-1 text-sm">
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
