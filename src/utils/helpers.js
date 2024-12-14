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

  // Regex untuk menangkap format HH:MM:SS.ssssss+ZZ atau HH:MM:SS.sssss+ZZ (5 atau 6 digit mikrodetik)
  const regex = /^(\d{2}):(\d{2}):(\d{2})\.(\d{5,6})\+(\d{2})$/;
  const match = timeStr.match(regex);

  if (!match) {
    console.error("Invalid time format:", timeStr);
    throw new Error("Invalid time format");
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const seconds = parseInt(match[3], 10);
  const microseconds = parseInt(match[4], 10); // Mikrodetik (5 atau 6 digit)
  //const timezoneOffset = parseInt(match[5], 10); // Zona waktu, tetapi tidak digunakan di sini

  // Menghitung total menit (dengan mikrodetik diubah menjadi bagian dari menit)
  const totalMinutes = hours * 60 + minutes + seconds / 60 + microseconds / 60000000;

  // Menghitung waktu yang tersisa berdasarkan input waktu
  const now = new Date();
  now.setHours(hours, minutes, seconds, microseconds / 1000); // Menggunakan mikrodetik dalam milidetik

  // Mengonversi waktu menjadi format ISO yang lebih jelas
  const formattedDate = now.toISOString();

  return {
    minutesLeft: Math.round(totalMinutes),
    date: formattedDate
  };
}
 // Menampilkan waktu dalam format MM:SS
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};