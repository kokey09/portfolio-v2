const INBOX = "khimrata11@gmail.com";

export function initCompose() {
  const form = document.getElementById("compose");
  if (!form) return;

  const setHint = (text, state) => {
    const hint = form.querySelector("[data-compose-hint]");
    if (!hint) return;
    hint.textContent = text;
    form.classList.toggle("is-sent", state === "sent");
    form.classList.toggle("is-error", state === "error");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const from = form.name.value.trim();
    const email = form.email.value.trim();
    const intent = form.intent.value.trim();
    const note = form.message.value.trim();
    const honey = form._honey.value.trim();
    const button = form.querySelector("button[type='submit']");

    if (honey) return;
    if (!from || !email || !intent || !note) {
      setHint("Name, reply address, intent, and brief — all four.", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setHint("That reply address does not look like mail.", "error");
      return;
    }

    if (button) button.disabled = true;
    setHint("Sending the letter…");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(INBOX)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: from,
            email,
            _replyto: email,
            intent,
            message: note,
            _subject: `Portfolio — ${from}: ${intent}`,
            _template: "table",
            _captcha: "false",
          }),
        }
      );
      const payload = await response.json().catch(() => ({}));
      const ok = response.ok && String(payload.success) !== "false";
      const text = String(payload.message || "");

      if (ok && /activat|confirm|verif/i.test(text)) {
        setHint("First send: confirm the FormSubmit mail in your inbox, then ask them to send again.", "sent");
      } else if (ok) {
        form.reset();
        setHint("Received. It is on its way to the inbox.", "sent");
      } else {
        setHint(text || "The letter did not leave. Try again in a moment.", "error");
      }
    } catch {
      setHint("The letter did not leave. Check the connection and try again.", "error");
    } finally {
      if (button) button.disabled = false;
    }
  });
}
