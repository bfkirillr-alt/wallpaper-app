import { ImageResponse } from "next/og";

export const runtime = "edge";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const quote = "Когда тяжело — вспомни, ради кого ты стараешься.";

function getMoscowDate() {
  return new Date(Date.now() + 3 * 60 * 60 * 1000);
}

function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const width = Number(searchParams.get("width")) || 1179;
  const height = Number(searchParams.get("height")) || 2556;

  const today = getMoscowDate();
  const year = today.getUTCFullYear();
  const currentMonth = today.getUTCMonth();
  const currentDay = today.getUTCDate();

  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const endOfYear = new Date(Date.UTC(year + 1, 0, 1));

  const dayOfYear =
    Math.floor((today.getTime() - startOfYear.getTime()) / 86400000) + 1;

  const totalDays =
    Math.floor((endOfYear.getTime() - startOfYear.getTime()) / 86400000);

  const daysLeft = totalDays - dayOfYear;
  const progress = Math.round((dayOfYear / totalDays) * 100);
  const monthDays = daysInMonth(year, currentMonth);

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          background: "#0b0b0b",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Arial",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 35%, rgba(255,107,61,0.16), transparent 34%), radial-gradient(circle at 50% 78%, rgba(255,255,255,0.06), transparent 28%)",
          }}
        />

        {Array.from({ length: 55 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${60 + ((i * 97) % 1040)}px`,
              top: `${520 + ((i * 149) % 1420)}px`,
              width: i % 5 === 0 ? 5 : 3,
              height: i % 5 === 0 ? 5 : 3,
              borderRadius: 999,
              background: i % 4 === 0 ? "#ff6b3d" : "#ffffff",
              opacity: i % 4 === 0 ? 0.45 : 0.22,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 640,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#ff6b3d",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: 8,
              marginBottom: 24,
              display: "flex",
            }}
          >
            {months[currentMonth].toUpperCase()}
          </div>

          <div
            style={{
              color: "#bdbdbd",
              fontSize: 34,
              marginBottom: 70,
              display: "flex",
            }}
          >
            {year}
          </div>

          <div
            style={{
              width: 820,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: monthDays }).map((_, index) => {
              const day = index + 1;

              let color = "#4b4b4b";
              let fontWeight = 500;
              let background = "transparent";
              let border = "0px solid transparent";

              if (day < currentDay) {
                color = "#ffffff";
              }

              if (day === currentDay) {
                color = "#ff6b3d";
                fontWeight = 800;
                background = "rgba(255,107,61,0.12)";
                border = "3px solid #ff6b3d";
              }

              return (
                <div
                  key={day}
                  style={{
                    width: 108,
                    height: 92,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                    fontSize: 58,
                    fontWeight,
                    borderRadius: 999,
                    background,
                    border,
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 1510,
            width: 850,
            height: 16,
            borderRadius: 999,
            background: "#2b2b2b",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#ff6b3d",
              borderRadius: 999,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: 1570,
            color: "#ff6b3d",
            fontSize: 44,
            fontWeight: 700,
            display: "flex",
          }}
        >
          {daysLeft} days left · {progress}%
        </div>

        <div
          style={{
            position: "absolute",
            top: 1665,
            width: 860,
            textAlign: "center",
            color: "#d8d8d8",
            fontSize: 34,
            lineHeight: 1.35,
            display: "flex",
            justifyContent: "center",
          }}
        >
          “{quote}”
        </div>

        <div
          style={{
            position: "absolute",
            top: 1820,
            color: "#5a5a5a",
            fontSize: 26,
            display: "flex",
          }}
        >
          daily wallpaper · generated automatically
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}
