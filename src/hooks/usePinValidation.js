import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const usePinValidation = (pin, orderCode) => {
  // State untuk menyimpan input PIN
  const [inputValue, setInputValue] = useState("");
  const isValidPin = inputValue === pin

  // State untuk timer
  const savedTime = localStorage.getItem("timeLeft-" + orderCode);
  const [timerUpdateOrder, setTimerUpdateOrder] = useState(
    savedTime ? parseInt(savedTime) : 300
  );

  // Update localStorage setiap kali timer berubah
  useEffect(() => {
    localStorage.setItem("timeLeft-" + orderCode, timerUpdateOrder);
  }, [timerUpdateOrder, orderCode]);

  // Logika untuk menunjukkan SweetAlert
  const showPinAlert = () => {
    if (timerUpdateOrder <= 1) {
      withReactContent(Swal).fire({
        icon: "warning",
        title: "Sorry...",
        confirmButtonColor: "#facc15",
        text: "You can't update your order.",
      });
    } else {
      withReactContent(Swal)
        .fire({
            title: "Insert Your PIN",
          input: "text",
          confirmButtonColor: "#facc15",
          inputValue,
          preConfirm: () => {
            // Before confirming, capture the input value
            const value = Swal.getInput()?.value || "";
            if (value !== pin) {
              Swal.showValidationMessage("The PIN you entered is incorrect.");
              setInputValue("");
              return false;
            }
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            setInputValue(result.value); // Set the value to inputValue if needed
          }
        });
    }
  };

  return {
    inputValue,
    timerUpdateOrder,
    setTimerUpdateOrder,
    showPinAlert,
    isValidPin
  };
};

export default usePinValidation;
