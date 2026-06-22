"use client";

import { useEffect, useState } from "react";
import quotes from "../data/quotes.json";

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const [weather, setWeather] = useState({
    city: "St. Petersburg",
    temp: "",
    feels: "loading weather...",
    available: false,
  });

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=59.9386&longitude=30.3141&current=temperature_2m,apparent_temperature&timezone=Europe%2FMoscow"
    )
      .then((res) => res.json())
      .then((data) => {
        const temp = Math.round(data.current.temperature_2m);
        const feels = Math.round(data.current.apparent_temperature);

        setWeather({
          city: "St. Petersburg",
          temp: `${temp}°`,
          feels: `feels like ${feels}°`,
          available: true,
        });
      })
      .catch(() => {
        setWeather({
          city: "St. Petersburg",
          temp: "",
          feels: "weather unavailable",
          available: false,
        });
      });
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (monthIndex: number) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year + 1, 0, 1);

  const dayOfYear =
    Math.floor((today.getTime() - startOfYear.getTime()) / 86400000) + 1;

  const totalDays = Math.floor(
    (endOfYear.getTime() - startOfYear.getTime()) / 86400000
  );

  const daysLeft = totalDays - dayOfYear;
  const progress = Math.round((dayOfYear / totalDays) * 100);
  const quote = quotes[dayOfYear % quotes.length];

  function MiniMonth({ monthIndex }: { monthIndex: number }) {
    const isPast = monthIndex < currentMonth;
    const amount = daysInMonth(monthIndex);

    return (
      <div>
        <div
          style={{
            color: "#b8b8b8",
            fontSize: "12px",
            marginBottom: "7px",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {months[monthIndex]}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "4px",
            justifyItems: "center",
          }}
        >
          {Array.from({ length: amount }).map((_, index) => (
            <div
              key={index}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "999px",
                background: isPast ? "#ffffff" : "#535353",
                opacity: isPast ? 0.85 : 0.85,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "430px",
          height: "932px",
          background: "#111111",
          color: "#ffffff",
          padding: "170px 30px 34px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 500,
            marginBottom: "34px",
            color: "#ffffff",
          }}
        >
          <span>{weather.city}</span>

          {weather.available ? (
            <>
              <span> · </span>
              <span
                style={{
                  color: "#ff6b3d",
                  fontWeight: 700,
                }}
              >
                {weather.temp}
              </span>
              <span> · {weather.feels}</span>
            </>
          ) : (
            <>
              <span> · </span>
              <span>{weather.feels}</span>
            </>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px 18px",
            marginBottom: "34px",
          }}
        >
          {months.slice(0, currentMonth).map((_, index) => (
            <MiniMonth key={index} monthIndex={index} />
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: "34px",
          }}
        >
          <div
            style={{
              color: "#ff6b3d",
              fontSize: "25px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            {months[currentMonth]}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "8px",
              maxWidth: "310px",
              margin: "0 auto",
            }}
          >
            {Array.from({ length: daysInMonth(currentMonth) }).map(
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
                    key={day}
                    style={{
                      color,
                      fontSize: "18px",
                      lineHeight: "24px",
                      textAlign: "center",
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
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px 18px",
            marginBottom: "30px",
          }}
        >
          {months.slice(currentMonth + 1).map((_, index) => {
            const monthIndex = currentMonth + 1 + index;
            return <MiniMonth key={monthIndex} monthIndex={monthIndex} />;
          })}
        </div>

        <div
          style={{
            textAlign: "center",
            color: "#ff6b3d",
            fontSize: "15px",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          {daysLeft} days left · {progress}%
        </div>

        <div
          style={{
            textAlign: "center",
            color: "#d8d8d8",
            fontSize: "11px",
            lineHeight: "17px",
            fontWeight: 500,
            maxWidth: "320px",
            margin: "0 auto",
            padding: "0 8px",
            wordBreak: "break-word",
          }}
        >
          “{quote}”
        </div>
      </section>
    </main>
  );
}
