// RTL date fix: Chrome renders the empty date placeholder reversed in Arabic locales.
document.querySelectorAll("input[type=date]").forEach((d) => {
  const toText = () => { if (!d.value) { d.type = "text"; d.placeholder = "اختر التاريخ"; } };
  d.addEventListener("focus", () => { if (d.type !== "date") { d.type = "date"; try { d.showPicker(); } catch {} } });
  d.addEventListener("blur", toText); toText();
});
// Preview build: no network, no storage. After approval, set WA to the studio's WhatsApp number.
const WA = "";

// Branch tabs (WAI-ARIA tabs pattern, arrow keys follow RTL order)
const tabs = [...document.querySelectorAll("[role=tab]")];
const select = (t) => {
  tabs.forEach((x) => { const on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; });
  t.focus();
};
tabs.forEach((t, i) => {
  t.addEventListener("click", () => select(t));
  t.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") select(tabs[(i + 1) % tabs.length]);
    if (e.key === "ArrowRight") select(tabs[(i - 1 + tabs.length) % tabs.length]);
  });
});

const form = document.getElementById("f"), date = form.elements.date;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = document.getElementById("err");
  if (!date.value) { err.hidden = false; date.setAttribute("aria-invalid", "true"); date.focus(); return; }
  err.hidden = true; date.removeAttribute("aria-invalid");
  const d = new Date(date.value + "T12:00").toLocaleDateString("ar-SA-u-ca-gregory", { weekday: "long", day: "numeric", month: "long" });
  const msg = ["السلام عليكم، أبغى أحجز جلسة تصوير.", `الفرع: ${form.querySelector("input[name=city]:checked").value}`, `نوع الجلسة: ${form.elements.type.value}`, `التاريخ المفضل: ${d}`].join("\n");
  if (WA) { window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener"); return; }
  document.getElementById("msg").textContent = msg;
  const o = document.getElementById("out"); o.hidden = false; o.scrollIntoView({ block: "nearest" });
});
