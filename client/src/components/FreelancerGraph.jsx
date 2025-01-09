import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';
import { useQuery } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { fetchLoggedInUser } from '@/query/fetchLoggedInUser';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  accepted: {
    label: 'Accepted',
    color: 'hsl(var(--chart-2))',
  },
  rejected: {
    label: 'Rejected',
    color: 'hsl(var(--chart-1))',
  },
};

export default function Component() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['me'],
    queryFn: fetchLoggedInUser,
    staleTime: 60 * 1000,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const totalApplications = data.noOfApplications;
  const acceptedApplications = data.works?.length || 0;
  const rejectedApplications = totalApplications - acceptedApplications;
  const chartData = [
    {
      status: 'rejected or pending',
      applications: rejectedApplications,
      fill: 'var(--color-rejected)',
    },
    {
      status: 'accepted',
      applications: acceptedApplications,
      fill: 'var(--color-accepted)',
    },
  ];

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Applications Pie Chart</CardTitle>
          <CardDescription>accepted,vs rejected or pending</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="applications"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalApplications.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Applications
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Total Applications <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
