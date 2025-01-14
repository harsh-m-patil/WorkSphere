import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { API_URL, IMAGE_URL } from '../utils/constants';
import { fetchLoggedInUser } from '../query/fetchLoggedInUser';

export default function UserSettings() {
  const queryClient = useQueryClient();
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertificate, setNewCertificate] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['me'],
    queryFn: fetchLoggedInUser,
    staleTime: 60 * 1000,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    skills: [],
    languages: [],
    certificates: [],
    profileImage: null,
  });

  // Update profile image mutation
  const updateProfileImageMutation = useMutation({
    mutationFn: async (file) => {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profileImage', file);

      return axios.patch(`${API_URL}/users/me/profile-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      toast.success('Profile image updated successfully');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      setSelectedImage(null);
    },
    onError: (error) => {
      toast.error(`Failed to update profile image: ${error.message}`);
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (updatedData) => {
      const token = localStorage.getItem('token');
      return axios.patch(`${API_URL}/users/me`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      return axios.delete(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success('Account deleted successfully');
      window.location.href = '/login';
    },
    onError: (error) => {
      toast.error(`Failed to delete account: ${error.message}`);
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpdate = async () => {
    if (selectedImage) {
      updateProfileImageMutation.mutate(selectedImage);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  // List management functions
  const addItem = (type, value, setter) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));
      setter('');
    }
  };

  const removeItem = (type, item) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((i) => i !== item),
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        skills: user.skills || [],
        languages: user.languages || [],
        certificates: user.certificates || [],
        profileImage: user.profileImage || null,
      });
      setImagePreview(user.profileImage || null);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto mt-12 space-y-6 p-6">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-[150px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="mx-auto mt-12 max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">
            Error Loading Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto mt-12 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Image Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={`${IMAGE_URL}${imagePreview.split('/')[3]}`}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-muted flex h-32 w-32 items-center justify-center rounded-full">
                    <span className="text-2xl">👤</span>
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profile-image-input"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById('profile-image-input').click()
                  }
                >
                  Choose Image
                </Button>
                {selectedImage && (
                  <Button type="button" onClick={handleImageUpdate}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Add or remove your technical skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem('skills', newSkill, setNewSkill);
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addItem('skills', newSkill, setNewSkill)}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeItem('skills', skill)}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages Card */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>
                Add or remove languages you speak
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a new language"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem('languages', newLanguage, setNewLanguage);
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() =>
                    addItem('languages', newLanguage, setNewLanguage)
                  }
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language) => (
                  <Badge
                    key={language}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => removeItem('languages', language)}
                  >
                    {language} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certificates Card */}
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>
                Add or remove your certifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newCertificate}
                  onChange={(e) => setNewCertificate(e.target.value)}
                  placeholder="Add a new certificate"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem(
                        'certificates',
                        newCertificate,
                        setNewCertificate
                      );
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() =>
                    addItem('certificates', newCertificate, setNewCertificate)
                  }
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.certificates.map((certificate) => (
                  <Badge
                    key={certificate}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => removeItem('certificates', certificate)}
                  >
                    {certificate} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Update or delete your account</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between gap-4">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteUserMutation.mutate()}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
