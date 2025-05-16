"use client"

import { useState, useEffect } from "react"
import MemeDisplay from "@/components/meme-display"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

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
  const { toast } = useToast()

  // Function to fetch a random meme from the API
  const fetchRandomMeme = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch data from the meme API
      const response = await fetch("https://meme-api.com/gimme", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 0 }, // Ensure fresh content each time
      })

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch meme: ${response.status} ${response.statusText}`)
      }

      // Parse the JSON response
      const data = await response.json()
      setMeme(data)

      // Announce to screen readers that a new meme has been loaded
      const statusElement = document.getElementById("status-message")
      if (statusElement) {
        statusElement.textContent = `New meme loaded: ${data.title}`
      }
    } catch (err) {
      // Handle any errors that occur during fetching
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch meme"
      setError(errorMessage)
      console.error("Error fetching meme:", err)

      // Show error toast
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      // Set loading to false regardless of success or failure
      setIsLoading(false)
    }
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press 'g' to generate a new meme
      if (
        e.key === "g" &&
        !isLoading &&
        !e.ctrlKey &&
        !e.metaKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        fetchRandomMeme()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLoading])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-background/80 backdrop-blur-sm">
        <h1 className="text-xl font-bold">Random Meme Generator</h1>
        <ThemeToggle />
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-16 md:p-24">
        {/* Hidden status message for screen readers */}
        <div id="status-message" className="sr-only" aria-live="polite" role="status"></div>

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-4">Random Meme Generator</h2>
            <p className="text-center text-muted-foreground">
              Click the button below to generate a random meme from Reddit.
              <span className="block mt-2 text-sm">
                (Or press the <kbd className="px-2 py-1 bg-muted rounded">G</kbd> key)
              </span>
            </p>
          </section>

          {/* Button to generate a new meme */}
          <Button
            size="lg"
            onClick={fetchRandomMeme}
            disabled={isLoading}
            className="px-8"
            aria-label={isLoading ? "Loading meme..." : "Generate new meme"}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Loading...</span>
              </>
            ) : (
              "Generate Meme"
            )}
          </Button>

          {/* Display error message if there's an error */}
          {error && (
            <div
              className="p-4 bg-destructive/10 text-destructive rounded-md w-full"
              role="alert"
              aria-live="assertive"
            >
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

      <footer className="py-6 px-4 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Random Meme Generator. All memes are sourced from Reddit.</p>
          <p className="mt-1">
            Press <kbd className="px-2 py-1 bg-muted rounded">G</kbd> to generate a new meme.
          </p>
        </div>
      </footer>

      <Toaster />
    </>
  )
}
