/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "./Button";
import { formatTime } from "../utils/helpers";

const CountdownTimer = ({ initialTime, orderCode, setTimerUpdateOrder }) => {
  // Cek apakah ada waktu yang tersimpan di localStorage
  const savedTime = localStorage.getItem("timeLeft-" + orderCode);
  const startTime = savedTime ? parseInt(savedTime, 10) : initialTime;

  // State untuk menyimpan waktu tersisa
  const [timeLeft, setTimeLeft] = useState(startTime);

  // Menggunakan useEffect untuk memulai timer ketika komponen di-mount
  useEffect(() => {
    // Jika waktu tersisa sudah mencapai 0, tidak perlu setInterval lagi
    if (timeLeft <= 0) return;

    // Set interval untuk mengurangi waktu setiap detik
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        // Simpan waktu terbaru ke localStorage setiap detik
        localStorage.setItem("timeLeft-" + orderCode, newTime);
        return newTime;
      });
    }, 1000);

    // Bersihkan interval ketika komponen unmount atau waktu selesai
    return () => clearInterval(timer);
  }, [timeLeft, orderCode]); // Jangan menambahkan setTimerUpdateOrder di sini!

  // Menggunakan useEffect terpisah untuk mengupdate state di komponen Order
  useEffect(() => {
    if (timeLeft <= 0) return;
    setTimerUpdateOrder(timeLeft); // Memperbarui timer di komponen Order
  }, [timeLeft, setTimerUpdateOrder]);

  // Jika waktu habis, tampilkan pesan waktu habis
  if (timeLeft <= 0) {
    return <div>Time for update your order is over.</div>;
  }

  return (
    <div>
      <Button type="secondary">
        {formatTime(timeLeft)} {/* Format tampilan waktu */}
      </Button>
    </div>
  );
};

export default CountdownTimer;
