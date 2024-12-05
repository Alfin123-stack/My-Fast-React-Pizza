export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(timeStr) {
  // const d1 = new Date().getTime();
  // const d2 = new Date(dateStr).getTime();
  // return Math.round((d2 - d1) / 60000);
 // Menggunakan regex untuk memecah waktu (jam, menit, detik, dan mikrodetik)
 const regex = /(\d{2}):(\d{2}):(\d{2})\.(\d{6})\+(\d{2})/;
 const match = timeStr.match(regex);
 
 if (!match) {
     throw new Error("Invalid time format");
 }

 const hours = parseInt(match[1], 10);
 const minutes = parseInt(match[2], 10);
 const seconds = parseInt(match[3], 10);

 // Menghitung total menit
 const totalMinutes = Math.round(hours * 60 + minutes + seconds / 60); // Membulatkan menit untuk format yang lebih rapi

 // Menghitung tanggal berdasarkan waktu yang diberikan
 const now = new Date();
 now.setUTCHours(hours, minutes, seconds, 0); // Set waktu UTC berdasarkan input

 // Mengonversi tanggal menjadi format ISO yang lebih rapi
 const formattedDate = now.toISOString();

 return {
     minutesLeft: totalMinutes,
     date: formattedDate // Menggunakan format ISO yang lebih jelas
 };
}
