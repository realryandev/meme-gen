"use client"

import { useState } from "react"
import MemeDisplay from "@/components/meme-display"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { ThemeToggle } from "@/components/theme-toggle"

// Define the Meme type for TypeScript
interface Meme {
  title: string
  url: string
  subreddit: string
  author: string
  postLink: string
}

export default function Home() {
  // State for the meme data, loading state, and error handling
  const [meme, setMeme] = useState<Meme | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Function to fetch a random meme from the API
  const fetchRandomMeme = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch data from the meme API
      const response = await fetch("https://meme-api.com/gimme")

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch meme: ${response.status} ${response.statusText}`)
      }

      // Parse the JSON response
      const data = await response.json()
      setMeme(data)
    } catch (err) {
      // Handle any errors that occur during fetching
      setError(err instanceof Error ? err.message : "Failed to fetch meme")
      console.error("Error fetching meme:", err)
    } finally {
      // Set loading to false regardless of success or failure
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-center">Random Meme Generator</h1>

        <p className="text-center text-muted-foreground">
          Click the button below to generate a random meme from Reddit.
        </p>

        {/* Button to generate a new meme */}
        <Button size="lg" onClick={fetchRandomMeme} disabled={isLoading} className="px-8">
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Generate Meme"
          )}
        </Button>

        {/* Display error message if there's an error */}
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md w-full">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Display the meme if it's loaded */}
        {meme && !error && <MemeDisplay meme={meme} />}

        {/* Show a message if no meme has been generated yet */}
        {!meme && !isLoading && !error && (
          <div className="p-8 border border-dashed rounded-lg text-center text-muted-foreground">
            No meme generated yet. Click the button above to get started!
          </div>
        )}
      </div>
    </main>
  )
}

