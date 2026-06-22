import { ImageResponse } from "next/og";
const quotes = ["Когда тяжело — вспомни, ради кого ты стараешься."];

export const runtime = "edge";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const width = Number(searchParams.get("width")) || 1179;
  const height = Number(searchParams.get("height")) || 2556;

  const today = new Date();
  const year = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year + 1, 0, 1);
  const dayOfYear =
    Math.floor((today.getTime() - startOfYear.getTime()) / 86400000) + 1;
  const totalDays =
    Math.floor((endOfYear.getTime() - startOfYear.getTime()) / 86400000);

  const daysLeft = totalDays - dayOfYear;
  const progress = Math.round((dayOfYear / totalDays) * 100);
  const quote = quotes[dayOfYear % quotes.length];

  let weather = {
    city: "St. Petersburg",
    temp: "—",
    feels: "weather unavailable",
  };

  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=59.9386&longitude=30.3141&current=temperature_2m,apparent_temperature&timezone=Europe%2FMoscow"
    );
    const data = await res.json();

    weather = {
      city: "St. Petersburg",
      temp: `${Math.round(data.current.temperature_2m)}°`,
      feels: `feels like ${Math.round(data.current.apparent_temperature)}°`,
    };
  } catch {}

  function MiniMonth({ monthIndex }: { monthIndex: number }) {
    const isPast = monthIndex < currentMonth;
    const amount = daysInMonth(year, monthIndex);

    return (
      <div style={{ width: 260, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ color: "#b8b8b8", fontSize: 30, marginBottom: 18 }}>
          {months[monthIndex]}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", width: 190, gap: 9 }}>
          {Array.from({ length: amount }).map((_, index) => (
            <div
              key={index}
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: isPast ? "#ffffff" : "#535353",
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          background: "#111111",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 430,
          fontFamily: "Arial",
        }}
      >
        <div
  style={{
    fontSize: 46,
    marginBottom: 90,
    color: "#ffffff",
    display: "flex",
  }}
>
  {weather.city} · {weather.temp} · {weather.feels}
</div>

        <div style={{ display: "flex", flexWrap: "wrap", width: 980, gap: 42, justifyContent: "center", marginBottom: 90 }}>
          {months.slice(0, currentMonth).map((_, index) => (
            <MiniMonth key={index} monthIndex={index} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 90 }}>
          <div style={{ color: "#ff6b3d", fontSize: 74, fontWeight: 700, marginBottom: 55 }}>
            {months[currentMonth].toUpperCase()}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", width: 820, gap: 24, justifyContent: "center" }}>
            {Array.from({ length: daysInMonth(year, currentMonth) }).map((_, index) => {
              const day = index + 1;

              let color = "#555555";
              let fontWeight = 500;

              if (day < currentDay) color = "#ffffff";
              if (day === currentDay) {
                color = "#ff6b3d";
                fontWeight = 800;
              }

              return (
                <div
                  key={day}
                  style={{
                    width: 82,
                    textAlign: "center",
                    color,
                    fontSize: 56,
                    fontWeight,
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", width: 980, gap: 42, justifyContent: "center", marginBottom: 90 }}>
          {months.slice(currentMonth + 1).map((_, index) => {
            const monthIndex = currentMonth + 1 + index;
            return <MiniMonth key={monthIndex} monthIndex={monthIndex} />;
          })}
        </div>

        <div style={{ color: "#ff6b3d", fontSize: 44, fontWeight: 700, marginBottom: 55 }}>
          {daysLeft} days left · {progress}%
        </div>

        <div style={{ width: 920, textAlign: "center", color: "#d8d8d8", fontSize: 34, lineHeight: 1.35 }}>
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
