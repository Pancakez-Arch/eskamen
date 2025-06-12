import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionCardProps {
  title: string;
  date: string;
}

export default function SessionCard({ title, date }: SessionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span>{new Date(date).toLocaleDateString("no-NO")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
