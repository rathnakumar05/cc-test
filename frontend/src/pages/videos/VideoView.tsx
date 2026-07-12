import { useParams, useNavigate } from 'react-router';
import { useVideoQuery } from './requests/queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function VideoView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: video, isLoading, error } = useVideoQuery(id!);

  if (isLoading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="text-destructive p-8 text-center">{error.message}</p>;
  if (!video) return <p className="p-8 text-center">Video not found</p>;

  return (
    <div className="mx-auto max-w-3xl p-8">
      <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
        ← Back
      </Button>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">{video.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-muted-foreground mb-1 text-sm font-semibold">Summary</h3>
            <p>{video.summary}</p>
          </div>
          <div>
            <h3 className="text-muted-foreground mb-1 text-sm font-semibold">Facebook Link</h3>
            {video.facebookLink ? (
              <a
                href={video.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary break-all hover:underline"
              >
                {video.facebookLink}
              </a>
            ) : (
              <span className="text-muted-foreground">Not available</span>
            )}
          </div>
          <div>
            <h3 className="text-muted-foreground mb-1 text-sm font-semibold">Twitter Link</h3>
            {video.twitterLink ? (
              <a
                href={video.twitterLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary break-all hover:underline"
              >
                {video.twitterLink}
              </a>
            ) : (
              <span className="text-muted-foreground">Not available</span>
            )}
          </div>
          <div className="pt-4">
            <Button onClick={() => navigate(`/videos/${video.id}/edit`)}>Edit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VideoView;
