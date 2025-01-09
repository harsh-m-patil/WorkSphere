import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Building2, Users, Briefcase, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { fetchWorkById } from '../query/fetchWorkById';
import { API_URL } from '../utils/constants';
import NoWorkFound from './NoWorkFound';

const Work = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['work', id],
    queryFn: () => fetchWorkById(id),
    staleTime: 60 * 1000,
  });

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Please login to apply for this position');
        return;
      }

      const response = await axios.post(
        `${API_URL}/work/apply`,
        { workId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'Failed to load work details'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return <NoWorkFound />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-transparent px-4 py-8 font-display"
    >
      <div className="container mx-auto max-w-7xl">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={data.client_id?.profileImage} />
                  <AvatarFallback>
                    {data.client_id?.userName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-semibold">{data.title}</h1>
                  <p className="text-muted-foreground text-lg">
                    {data.client_id?.userName}
                  </p>
                  <Badge
                    variant="secondary"
                    className="mt-1 border border-purple-300 bg-purple-50 text-base"
                  >
                    {data.location || 'Remote'}
                  </Badge>
                </div>
              </div>
              <Button
                size="lg"
                onClick={handleApply}
                className="bg-gradient-to-r from-teal-400 to-teal-500 text-neutral-800 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Apply Now
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={<DollarSign className="h-4 w-4" />}
                title="Pay"
                value={`$${data.pay}`}
                className="border border-green-400 bg-green-50 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              />
              <StatCard
                icon={<Briefcase className="h-4 w-4" />}
                title="Job Type"
                value={data.joblevel}
                className="border border-blue-400 bg-blue-50 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              />
              <StatCard
                icon={<Users className="h-4 w-4" />}
                title="Applicants"
                value={data.applied_status.length}
                className="border border-orange-400 bg-orange-50 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              />
              <StatCard
                icon={<Building2 className="h-4 w-4" />}
                title="Status"
                value={data.active ? 'Active' : 'Inactive'}
                className="border border-purple-400 bg-purple-50 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              />
            </div>

            {/* Description Tabs */}
            <Tabs
              defaultValue="description"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description" className="text-lg">
                  Job Description
                </TabsTrigger>
                <TabsTrigger value="company" className="text-lg">
                  Company Info
                </TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value="description" className="mt-6">
                    <DescriptionCard data={data} />
                  </TabsContent>
                  <TabsContent value="company" className="mt-6">
                    <CompanyCard data={data.client_id} />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, title, value, className }) => {
  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-4 p-4">
        {icon}
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const DescriptionCard = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Required Skills</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills_Required.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Description</h3>
          <p className="text-muted-foreground mt-2">{data.description}</p>
        </div>
        <div>
          <h3 className="font-semibold">Requirements</h3>
          <p className="text-muted-foreground mt-2">{data.requirements}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const CompanyCard = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">About</h3>
          <p className="text-muted-foreground mt-2">
            {data?.description || 'No company description available.'}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <p className="text-muted-foreground mt-2">
            {data?.email || 'No contact information available.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Work;
