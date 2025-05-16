"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

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
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { toast } = useToast()

  // Share functionality
  const shareMeme = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: meme.title,
          text: `Check out this meme from r/${meme.subreddit}`,
          url: meme.postLink,
        })
        toast({
          title: "Shared successfully",
          description: "The meme has been shared!",
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback to copying the link
      navigator.clipboard.writeText(meme.postLink)
      toast({
        title: "Link copied",
        description: "Meme link copied to clipboard!",
      })
    }
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">{meme.title}</CardTitle>
      </CardHeader>

      {/* Meme image container with responsive sizing */}
      <CardContent className="p-0 relative">
        <div
          className="relative w-full aspect-video bg-muted flex items-center justify-center"
          aria-live="polite"
          aria-busy={!imageLoaded && !imageError}
        >
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}

          {imageError ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>Failed to load image. The meme might be unavailable.</p>
              <p className="mt-2">Try generating a new one!</p>
            </div>
          ) : (
            /* Use Next.js Image component for optimized image loading */
            <Image
              src={meme.url || "/placeholder.svg"}
              alt={meme.title}
              fill
              className={`object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="eager"
            />
          )}
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

        <div className="flex gap-2">
          {/* Share button */}
          <Button variant="outline" size="sm" onClick={shareMeme} aria-label="Share meme">
            <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
            Share
          </Button>

          {/* Link to original post */}
          <Button variant="outline" size="sm" asChild>
            <a
              href={meme.postLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
              aria-label="View original post on Reddit"
            >
              <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
              Original
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
