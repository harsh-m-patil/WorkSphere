import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';

const ClientPostWork = () => {
  const navigate = useNavigate();
  const [jobdata, setJobdata] = useState({
    title: '',
    description: '',
    pay: '',
    joblevel: 'Medium',
    skills_Required: '',
  });

  const handleChange = (e) => {
    setJobdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setJobdata((prev) => ({
      ...prev,
      description: value || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      const skills_array = jobdata.skills_Required
        .split(',')
        .map((skill) => skill.trim());

      const response = await axios.post(
        `${API_URL}/work`,
        {
          ...jobdata,
          skills_Required: skills_array,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Work Added Successfully', { position: 'top-center' });
      navigate('/client/dashboard');
    } catch (err) {
      console.error('Error posting work:', err);
      toast.error('Failed to post work.', { position: 'top-center' });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <Card className="w-full max-w-3xl shadow-2xl">
        <CardContent className="space-y-6 p-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-800">
            Post a New Job
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={jobdata.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Job Description (Markdown Supported)</Label>
              <div className="rounded-md border p-2">
                <MDEditor
                  value={jobdata.description}
                  onChange={handleDescriptionChange}
                  height={300}
                  preview="edit"
                  data-color-mode="light"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pay">Pay</Label>
              <Input
                type="number"
                id="pay"
                name="pay"
                value={jobdata.pay}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="joblevel">Job Level</Label>
              <select
                id="joblevel"
                name="joblevel"
                value={jobdata.joblevel}
                onChange={handleChange}
                className="block w-full rounded-md border bg-gray-50 p-3 text-gray-700 shadow-sm transition hover:shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills_Required">
                Skills Required (comma separated)
              </Label>
              <Input
                type="text"
                id="skills_Required"
                name="skills_Required"
                value={jobdata.skills_Required}
                onChange={handleChange}
                placeholder="e.g., SEO Knowledge, Grammar, Proofreading"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Post Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPostWork;
