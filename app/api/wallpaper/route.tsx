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

  let weatherText = "St. Petersburg";

  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=59.9386&longitude=30.3141&current=temperature_2m,apparent_temperature&timezone=Europe%2FMoscow",
      { cache: "no-store" }
    );

    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const feels = Math.round(data.current.apparent_temperature);

    weatherText = `St. Petersburg · ${temp}° · feels like ${feels}°`;
  } catch {
    weatherText = "St. Petersburg · weather unavailable";
  }

  const renderMiniMonth = (monthIndex: number) => {
    const amount = daysInMonth(year, monthIndex);
    const isPast = monthIndex < currentMonth;

    return (
      <div
        key={`mini-${monthIndex}`}
        style={{
          width: 285,
          height: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 26,
        }}
      >
        <div
          style={{
            color: "#b8b8b8",
            fontSize: 30,
            marginBottom: 18,
            display: "flex",
          }}
        >
          {months[monthIndex]}
        </div>

        <div
          style={{
            width: 205,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: amount }).map((_, index) => (
            <div
              key={`dot-${monthIndex}-${index}`}
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: isPast ? "#ffffff" : "#4d4d4d",
                margin: 5,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

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
          fontFamily: "Arial",
          paddingTop: 430,
        }}
      >
        <div
          style={{
            fontSize: 46,
            marginBottom: 90,
            display: "flex",
            color: "#ffffff",
          }}
        >
          {weatherText}
        </div>

        <div
          style={{
            width: 1040,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 70,
          }}
        >
          {months.slice(0, currentMonth).map((_, index) =>
            renderMiniMonth(index)
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          <div
            style={{
              color: "#ff6b3d",
              fontSize: 76,
              fontWeight: 700,
              marginBottom: 55,
              display: "flex",
            }}
          >
            {months[currentMonth].toUpperCase()}
          </div>

          <div
            style={{
              width: 820,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: daysInMonth(year, currentMonth) }).map(
              (_, index) => {
                const day = index + 1;

                let color = "#555555";
                let fontWeight = 500;

                if (day < currentDay) {
                  color = "#ffffff";
                }

                if (day === currentDay) {
                  color = "#ff6b3d";
                  fontWeight = 800;
                }

                return (
                  <div
                    key={`day-${day}`}
                    style={{
                      width: 100,
                      height: 78,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color,
                      fontSize: 58,
                      fontWeight,
                    }}
                  >
                    {day}
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div
          style={{
            width: 1040,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 70,
          }}
        >
          {months.slice(currentMonth + 1).map((_, index) =>
            renderMiniMonth(currentMonth + 1 + index)
          )}
        </div>

        <div
          style={{
            color: "#ff6b3d",
            fontSize: 46,
            fontWeight: 700,
            marginBottom: 55,
            display: "flex",
          }}
        >
          {daysLeft} days left · {progress}%
        </div>

        <div
          style={{
            width: 920,
            textAlign: "center",
            color: "#d8d8d8",
            fontSize: 36,
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
