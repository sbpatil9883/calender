// import React from "react";
import "./App.css";
function Calendar({ date = new Date() }) {
  const weekDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const year = date.getFullYear();
  const month = date.getMonth();
  const currentDay = date.getDate();
  const monthName = new Date(year, month).toLocaleString(undefined, {
    month: "long",
  });

  const calenderMatrix = () => {
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = first.getDay();

    const weeks = [];
    let currentWeek = new Array(7).fill(null);
    let day = 1;

    for (let i = startDay; i < 7; i++) {
      currentWeek[i] = day++;
    }
    weeks.push(currentWeek);

    while (day <= daysInMonth) {
      currentWeek = new Array(7).fill(null);
      for (let i = 0; i < 7 && day <= daysInMonth; i++) {
        currentWeek[i] = day++;
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const calenderStructure = calenderMatrix();

  return (
    <div
      role="table"
      aria-label={`Calendar for ${monthName} ${year}`}
      style={{
        width: 300,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
        background: "#0b191f",
        padding: 6,
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <strong
          style={{ color: "#839496", fontSize: 25, fontWeight: 600 }}
        >{`${monthName} ${year}`}</strong>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          color: "#7e8f91",
          fontSize: 25,
          fontWeight: 600,
        }}
      >
        {weekDayNames.map((w) => (
          <div key={w} style={{ textAlign: "center" }}>
            {w}
          </div>
        ))}
      </div>

      <div>
        {calenderStructure.map((week, wi) => (
          <div
            key={wi}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 2,
              marginBottom: 4,
              fontWeight: 600,
            }}
          >
            {week.map((d, di) => {
              const isHighlight = d === currentDay;
              return (
                <div
                  key={di}
                  role={d ? "cell" : "gridcell"}
                  aria-current={isHighlight ? "date" : undefined}
                  style={{
                    minHeight: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isHighlight ? "#839496" : "transparent",
                    color: isHighlight ? "" : "#839496",
                    fontWeight: isHighlight ? 700 : 600,
                    fontSize: 25,
                  }}
                >
                  {d ?? ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const exampleDate = new Date(2020, 7, 14);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
      <Calendar date={exampleDate} />
    </div>
  );
}

export default App;
