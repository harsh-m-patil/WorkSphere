import { Card, CardContent, CardHeader } from '../ui/card';

const StatCard = ({ icon, title, value, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="px-4 py-2 text-xl">{title}</CardHeader>
      <CardContent className="flex items-center gap-4 p-2 px-4">
        <div className="flex items-center gap-4">
          {icon}
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
