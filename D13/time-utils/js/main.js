const timeAgo = function (dateString) {
    const now = new Date();
    const past = new Date(dateString);

    const diffInSeconds = Math.floor((now - past) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInSeconds < 60) {
        return "Vừa xong";
    }

    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    }

    if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    }

    const day = String(past.getDate()).padStart(2, "0");
    const month = String(past.getMonth() + 1).padStart(2, "0");
    const year = past.getFullYear();
    return `${day}/${month}/${year}`;
};

console.log(timeAgo("2026-09-22T00:08:00+07:00"));
console.log(timeAgo("2026-09-21T23:08:00+07:00"));
console.log(timeAgo("2026-09-21T23:40:00+07:00"));
console.log(timeAgo("2026-09-18T08:00:00+07:00"));


function getCountdown(dateString) {
  const now = new Date();
  const future = new Date(dateString);
  const diff = future - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60)); 
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

const countdown = getCountdown("2026-09-23T15:30:20+07:00");
console.log(countdown);


function isWeekend(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

console.log(isWeekend("2026-09-26"));
console.log(isWeekend("2026-09-27")); 
console.log(isWeekend("2026-09-28")); 