const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

async function copyText(value, message = "Скопійовано") {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast(message);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => {
    const element = document.getElementById(button.dataset.copy);
    if (!element) return;
    copyText(element.textContent.trim(), "Реквізити скопійовано");
  });
});

const pageUrl = window.location.href;
const shareText = "Підтримай збір для наших захисників.";

document.getElementById("tg").href =
  `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;

document.getElementById("wa").href =
  `https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`;

document.getElementById("fb").href =
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;

document.getElementById("viber").href =
  `viber://forward?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`;

document.getElementById("copyLink").addEventListener("click", () => {
  copyText(pageUrl, "Посилання скопійовано");
});

document.getElementById("nativeShare").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Підтримай наших захисників",
        text: shareText,
        url: pageUrl
      });
    } catch (_) {}
  } else {
    copyText(pageUrl, "Посилання скопійовано");
  }
});
