const NY_TIMEZONE = "America/New_York";

export function toNyDate(utcMs) {
  const date = utcMs instanceof Date ? utcMs : new Date(utcMs);
  // This keeps the UTC timestamp but is a semantic helper for clarity.
  return new Date(date.getTime());
}

export function getNyPartitionStart(date, unit) {
  const d = toNyDate(date);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: NY_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric"
  })
    .formatToParts(d)
    .reduce((acc, p) => {
      if (p.type !== "literal") acc[p.type] = parseInt(p.value, 10);
      return acc;
    }, {});

  const year = parts.year;
  const month = parts.month;
  const day = parts.day;
  const hour = parts.hour;

  let nyStart;
  if (unit === "day") {
    nyStart = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  } else if (unit === "week") {
    const jsDate = new Date(
      new Date(d).toLocaleString("en-US", { timeZone: NY_TIMEZONE })
    );
    const dow = jsDate.getDay();
    const diff = (dow + 7 - 1) % 7;
    jsDate.setDate(jsDate.getDate() - diff);
    nyStart = new Date(
      Date.UTC(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate(), 0, 0, 0, 0)
    );
  } else if (unit === "month") {
    nyStart = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
  } else if (unit === "quarter") {
    const quarterMonth = Math.floor((month - 1) / 3) * 3;
    nyStart = new Date(Date.UTC(year, quarterMonth, 1, 0, 0, 0, 0));
  } else if (unit === "h4") {
    const block = Math.floor(hour / 4) * 4;
    nyStart = new Date(Date.UTC(year, month - 1, day, block, 0, 0, 0));
  } else {
    nyStart = d;
  }

  return nyStart;
}


