import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 100,
        }}
      >
        TEST
      </div>
    ),
    {
      width: 1179,
      height: 2556,
    }
  );
}
