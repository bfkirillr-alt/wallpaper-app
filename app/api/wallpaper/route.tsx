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
  const monthName = months[currentMonth].toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          background: "#090909",
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
            left: 360,
            top: 70,
            width: 460,
            height: 170,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,107,61,0.28) 0%, rgba(255,107,61,0.12) 35%, transparent 72%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 155,
            top: 1900,
            width: 190,
            height: 190,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,107,61,0.32) 0%, rgba(255,107,61,0.12) 42%, transparent 74%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 155,
            top: 1900,
            width: 190,
            height: 190,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,107,61,0.32) 0%, rgba(255,107,61,0.12) 42%, transparent 74%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 34%, rgba(255,107,61,0.16), transparent 32%), radial-gradient(circle at 50% 76%, rgba(255,255,255,0.05), transparent 28%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 165,
            top: 510,
            width: 850,
            height: 850,
            borderRadius: 999,
            border: "2px solid rgba(255,107,61,0.08)",
            boxShadow:
              "0 0 80px rgba(255,107,61,0.12), inset 0 0 70px rgba(255,107,61,0.05)",
          }}
        />

        {Array.from({ length: 90 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${30 + ((i * 97) % 1120)}px`,
              top: `${360 + ((i * 149) % 1700)}px`,
              width: i % 8 === 0 ? 5 : 3,
              height: i % 8 === 0 ? 5 : 3,
              borderRadius: 999,
              background: i % 4 === 0 ? "#ff6b3d" : "#ffffff",
              opacity: i % 4 === 0 ? 0.5 : 0.22,
              boxShadow:
                i % 4 === 0
                  ? "0 0 12px rgba(255,107,61,0.55)"
                  : "0 0 8px rgba(255,255,255,0.20)",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 650,
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
              textShadow:
                "0 0 10px rgba(255,107,61,0.85), 0 0 26px rgba(255,107,61,0.55), 0 0 60px rgba(255,107,61,0.32)",
            }}
          >
            {monthName}
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
              let shadow = "none";

              if (day < currentDay) {
                color = "#ffffff";
              }

              if (day === currentDay) {
                color = "#ff6b3d";
                fontWeight = 800;
                background = "rgba(255,107,61,0.20)";
                border = "4px solid #ff6b3d";
                shadow =
                  "0 0 24px rgba(255,107,61,0.9), 0 0 54px rgba(255,107,61,0.55)";
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
                    boxShadow: shadow,
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
            height: 12,
            borderRadius: 999,
            background: "#2b2b2b",
            display: "flex",
            overflow: "hidden",
            boxShadow: "0 0 22px rgba(255,107,61,0.18)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#ff6b3d",
              borderRadius: 999,
              boxShadow:
                "0 0 18px rgba(255,107,61,0.9), 0 0 38px rgba(255,107,61,0.55)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: 1565,
            color: "#ff6b3d",
            fontSize: 44,
            fontWeight: 700,
            display: "flex",
            textShadow:
              "0 0 14px rgba(255,107,61,0.65), 0 0 32px rgba(255,107,61,0.35)",
          }}
        >
          {daysLeft} days left · {progress}%
        </div>

        <div
          style={{
            position: "absolute",
            top: 1655,
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
      </div>
    ),
    {
      width,
      height,
    }
  );
}
