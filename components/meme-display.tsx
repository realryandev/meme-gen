import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define the Meme type for TypeScript
interface Meme {
  title: string
  url: string
  subreddit: string
  author: string
  postLink: string
}

interface MemeDisplayProps {
  meme: Meme
}

export default function MemeDisplay({ meme }: MemeDisplayProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">{meme.title}</CardTitle>
      </CardHeader>

      {/* Meme image container with responsive sizing */}
      <CardContent className="p-0 relative">
        <div className="relative w-full aspect-video bg-muted flex items-center justify-center">
          {/* Use Next.js Image component for optimized image loading */}
          <Image
            src={meme.url || "/placeholder.svg"}
            alt={meme.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      </CardContent>

      {/* Footer with meme details */}
      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4">
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="w-fit">
            r/{meme.subreddit}
          </Badge>
          <p className="text-sm text-muted-foreground">Posted by u/{meme.author}</p>
        </div>

        {/* Link to original post */}
        <a
          href={meme.postLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          View Original
        </a>
      </CardFooter>
    </Card>
  )
}

