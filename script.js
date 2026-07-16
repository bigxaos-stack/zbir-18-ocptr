const CARD_NUMBER = "4149511028197408";

const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

async function copyText(text, successMessage = "Скопійовано") {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast(successMessage);
  const status = document.getElementById("copyStatus");
  if (status) status.textContent = successMessage;
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => {
    copyText(button.dataset.copy, "Дані скопійовано");
  });
});

document.getElementById("payButton").addEventListener("click", async () => {
  await copyText(CARD_NUMBER, "Номер картки скопійовано");
  document.getElementById("cardBlock").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.getElementById("copyAll").addEventListener("click", () => {
  const text = [
    "ПІБ отримувача: Патюк Андрій Юрійович",
    "ІПН: 3263121630",
    "IBAN: UA1430033500000002620916652865",
    "Номер картки: 4149511028197408",
    "Призначення платежу: Поповнення скрині"
  ].join("\n");
  copyText(text, "Усі реквізити скопійовано");
});

const shareText = "Підтримайте збір на комплект автомобільних шин для військових.";
const pageUrl = window.location.href;

document.querySelectorAll("[data-share]").forEach((button) => {
  button.addEventListener("click", async () => {
    const type = button.dataset.share;
    const url = encodeURIComponent(pageUrl);
    const text = encodeURIComponent(shareText);

    if (type === "copy") {
      await copyText(pageUrl, "Посилання скопійовано");
      return;
    }

    const links = {
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      viber: `viber://forward?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`
    };

    window.open(links[type], "_blank", "noopener,noreferrer");
  });
});
