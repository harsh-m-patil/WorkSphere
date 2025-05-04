import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Brain } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchWorkById } from '@/query/fetchWorkById';
import MarkdownRenderer from './MarkdownRenderer';
import { API_URL } from '@/utils/constants';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { fetchLoggedInUser } from '@/query/fetchLoggedInUser';

export const AIStudio = () => {
  const { id: idFromURL } = useParams();
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useQuery({
    queryKey: ['me'],
    queryFn: fetchLoggedInUser,
    staleTime: 60 * 1000,
  });
  const [analyzeMarkdown, setAnalyzeMarkdown] = useState(
    'Analyzing the job description according to your profile ...'
  );
  const [generatedQuestions, setGeneratedQuestions] = useState(
    'Generating interview questions according to the job description and your profile ...'
  );

  const [inputId, setInputId] = useState('');
  const [workId, setWorkId] = useState(null);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (idFromURL) {
      setInputId(idFromURL);
      setWorkId(idFromURL);
    }
  }, [idFromURL]);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['work', workId],
    queryFn: () => fetchWorkById(workId),
    enabled: !!workId,
    staleTime: 60 * 1000,
  });

  const updateWorkId = () => {
    setWorkId(inputId);
  };

  const handleAnalyzeClick = async () => {
    if (!data) return;

    const { description, skills_Required } = data;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const promise = fetch(`${API_URL}/ai/skill-match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, skills: skills_Required }),
      });

      toast.promise(promise, {
        loading: 'Generating Skill report...',
        success: 'AI Based skill match report generated',
        error: 'Error generating report',
      });

      const response = await promise;
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const apiData = await response.json();
      setAnalyzeMarkdown(apiData.data.markdown);
      setMode('analyze');
    } catch (err) {
      toast.error('Failed to analyze skills. Please try again later.');
    }
  };

  const handleGenQuestions = async () => {
    if (!data) return;

    const { description, skills_Required } = data;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const promise = fetch(`${API_URL}/ai/interview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, skills: skills_Required }),
      });

      toast.promise(promise, {
        loading: 'Generating interview questions...',
        success: 'Interview questions generated successfully',
        error: 'Error generating interview questions',
      });

      const response = await promise;
      if (!response.ok) {
        throw new Error('Failed to generate interview questions');
      }

      const apiData = await response.json();
      setGeneratedQuestions(apiData.data.markdown);
      setMode('interview');
    } catch (err) {
      console.error('Error generating questions:', err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-muted px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Input + Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              <div className="flex items-center justify-between">
                AI Studio
                <Brain />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter Work ID"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex flex-col gap-4 md:flex-row">
                <Button
                  onClick={handleAnalyzeClick}
                  disabled={!user?.pro || !workId}
                >
                  Analyze with AI
                </Button>
                <Button
                  variant="outline"
                  disabled={!user?.pro || !workId}
                  onClick={handleGenQuestions}
                >
                  Generate Sample Interview Questions
                </Button>
              </div>
              <Button onClick={updateWorkId} variant="generative">
                Update ID
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading/Error States */}
        {isLoading && (
          <div className="flex justify-center pt-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message || 'Failed to load work details'}
            </AlertDescription>
          </Alert>
        )}

        {/* User Loading/Error States */}
        {isLoadingUser && (
          <div className="flex justify-center pt-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {isErrorUser && (
          <Alert variant="destructive">
            <AlertTitle>User Error</AlertTitle>
            <AlertDescription>
              {errorUser?.message || 'Failed to load user details'}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Grid View */}
        {data && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Job Description Panel */}
            <Card className="max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {data.title}{' '}
                  {data.client_id?.userName && `at ${data.client_id.userName}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MarkdownRenderer markdown={data.description} />
              </CardContent>
            </Card>

            {/* AI Output Panel */}
            <Card className="max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {mode === 'analyze'
                    ? '🔍 AI Analysis'
                    : mode === 'interview'
                      ? '📋 Sample Interview Questions'
                      : 'AI Output'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user?.pro ? (
                  <>
                    {mode === 'analyze' && (
                      <MarkdownRenderer markdown={analyzeMarkdown} />
                    )}
                    {mode === 'interview' && (
                      <MarkdownRenderer markdown={generatedQuestions} />
                    )}
                    {!mode && (
                      <p className="text-muted-foreground">
                        Select a mode to begin.
                      </p>
                    )}
                  </>
                ) : (
                  <Badge className="text-md border border-red-600 bg-red-100 px-4 py-1 text-red-950 hover:bg-red-100">
                    You need a pro subscription to use this feature
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
