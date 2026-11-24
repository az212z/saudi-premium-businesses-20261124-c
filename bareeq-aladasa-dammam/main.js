// RTL date fix: Chrome renders the empty date placeholder reversed in Arabic locales.
document.querySelectorAll("input[type=date]").forEach((d) => {
  const toText = () => { if (!d.value) { d.type = "text"; d.placeholder = "اختر التاريخ"; } };
  d.addEventListener("focus", () => { if (d.type !== "date") { d.type = "date"; try { d.showPicker(); } catch {} } });
  d.addEventListener("blur", toText); toText();
});
// Preview build: no network, no storage. After approval, set WA to the studio's WhatsApp number.
const WA = "";
const form = document.getElementById("f"), date = form.elements.date;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = document.getElementById("err");
  if (!date.value) { err.hidden = false; date.setAttribute("aria-invalid", "true"); date.focus(); return; }
  err.hidden = true; date.removeAttribute("aria-invalid");
  const d = new Date(date.value + "T12:00").toLocaleDateString("ar-SA-u-ca-gregory", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const msg = ["السلام عليكم، أبغى أحجز موعد تصوير.", `نوع التصوير: ${form.querySelector("input[name=kind]:checked").value}`, `المناسبة: ${form.elements.occ.value}`, `التاريخ: ${d}`].join("\n");
  if (WA) { window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener"); return; }
  document.getElementById("msg").textContent = msg;
  const o = document.getElementById("out"); o.hidden = false; o.scrollIntoView({ block: "nearest" });
});
