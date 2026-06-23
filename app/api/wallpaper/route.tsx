import { ImageResponse } from "next/og";

export const runtime = "edge";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const quotes = [
  "Не жди идеального момента. Делай сейчас.",
  "Сегодня важнее, чем кажется.",
  "Тише, но точнее.",
  "Держи курс.",
  "Сделай день дорогим.",
  "Не сливай темп.",
  "Дисциплина сильнее настроения.",
  "Ты ближе, чем думаешь.",
  "Маленький шаг всё равно шаг.",
  "Сначала порядок, потом скорость.",
  "Не торопись. Ускоряйся правильно.",
  "Сегодня не день для отката.",
  "Соберись и сделай.",
  "Ради себя. Ради семьи. Ради будущего.",
  "Спокойно. Чётко. До результата.",
  "Побеждает тот, кто не бросил.",
  "Не обязательно идеально. Обязательно продолжать.",
  "Сфокусируйся на главном.",
  "Минус хаос. Плюс действие.",
  "Твоя жизнь собирается из таких дней.",
  "Деньги любят систему.",
  "Результат любит повторение.",
  "Держи план, даже если тяжело.",
  "Сегодня ты строишь завтра.",
  "Не ищи мотивацию. Создай движение.",
  "Сначала сделать, потом оценивать.",
  "Один хороший день меняет траекторию.",
  "Не драматизируй. Действуй.",
  "Сила — в стабильности.",
  "Не распыляйся.",
  "Сделай меньше, но лучше.",
  "Устал — замедлись, но не остановись.",
  "Каждый день — кирпич.",
  "Не предавай свои цели.",
  "Ты уже начал. Продолжай.",
  "Фокус решает.",
  "Без суеты. Без жалости. Вперёд.",
  "Сегодня можно стать сильнее.",
  "Не откладывай себя.",
  "Собери день в кулак.",
];

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
  const quote = quotes[dayOfYear % quotes.length];

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
            left: 315,
            top: 42,
            width: 550,
            height: 210,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,107,61,0.20) 0%, rgba(255,107,61,0.09) 38%, rgba(255,107,61,0.03) 62%, transparent 78%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 405,
            top: 82,
            width: 370,
            height: 115,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,107,61,0.14) 0%, rgba(255,107,61,0.06) 48%, transparent 76%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,107,61,0.045), transparent 40%)",
          }}
        />

        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${50 + ((i * 97) % 1080)}px`,
              top: `${430 + ((i * 149) % 1500)}px`,
              width: i % 6 === 0 ? 4 : 3,
              height: i % 6 === 0 ? 4 : 3,
              borderRadius: 999,
              background: i % 4 === 0 ? "#ff6b3d" : "#ffffff",
              opacity: i % 4 === 0 ? 0.32 : 0.16,
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

              if (day < currentDay) {
                color = "#ffffff";
              }

              if (day === currentDay) {
                color = "#ff6b3d";
                fontWeight = 800;
                background = "rgba(255,107,61,0.22)";
                border = "4px solid #ff6b3d";
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
            height: 12,
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
            top: 1565,
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
