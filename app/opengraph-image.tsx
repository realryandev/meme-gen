import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Random Meme Generator"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        padding: 48,
      }}
    >
      <div style={{ fontSize: 64, fontWeight: "bold", marginBottom: 40 }}>Random Meme Generator</div>
      <div style={{ fontSize: 32, opacity: 0.8 }}>Generate random memes from Reddit with a single click</div>
    </div>,
    {
      ...size,
    },
  )
}
