import { ArrowUpRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import "./contact-form.css";

type FieldName = "name" | "email" | "company" | "message";
type Values = Record<FieldName, string>;

const initialValues: Values = { name: "", email: "", company: "", message: "" };
const fieldLimits = { name: 80, email: 254, company: 120, message: 1200 } as const;

function validate(values: Values) {
  return {
    name: values.name.trim().length < 2 ? "Please enter your name." : values.name.length > fieldLimits.name ? "Keep your name under 80 characters." : "",
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? "Enter a valid work email." : values.email.length > fieldLimits.email ? "Keep your email under 254 characters." : "",
    company: values.company.length > fieldLimits.company ? "Keep your company name under 120 characters." : "",
    message: values.message.trim().length < 12 ? "Add a short note so we can prepare." : values.message.length > fieldLimits.message ? "Keep your note under 1,200 characters." : "",
  } satisfies Record<FieldName, string>;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({ name: false, email: false, company: false, message: false });
  const [submitted, setSubmitted] = useState(false);
  const errors = useMemo(() => validate(values), [values]);

  const stateFor = (field: FieldName) => !touched[field] ? "" : errors[field] ? "is-invalid" : "is-valid";
  const updateField = (field: FieldName, value: string) => {
    setSubmitted(false);
    setValues((current) => ({ ...current, [field]: value }));
  };
  const markTouched = (field: FieldName) => setTouched((current) => ({ ...current, [field]: true }));
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, company: true, message: true });
    if (Object.values(errors).some(Boolean)) return;
    const subject = encodeURIComponent(`CORTEX access request — ${values.company.trim() || values.name.trim()}`);
    const body = encodeURIComponent(`Name: ${values.name.trim()}\nWork email: ${values.email.trim()}\nCompany: ${values.company.trim() || "Not provided"}\n\n${values.message.trim()}`);
    setSubmitted(true);
    window.location.href = `mailto:hello@cortexbrain.ai?subject=${subject}&body=${body}`;
  };

  return <section className="contact-form-shell" aria-labelledby="contact-form-title">
    <div className="contact-form-heading"><p>OPEN A CHANNEL / 01</p><h3 id="contact-form-title">START WITH THE<br />BOUNDARY.</h3><span>Tell us where your company’s memory needs to stay.</span></div>
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <label className={`contact-field ${stateFor("name")}`}><span>YOUR NAME</span><input name="name" autoComplete="name" maxLength={fieldLimits.name} value={values.name} onChange={(event) => updateField("name", event.target.value)} onBlur={() => markTouched("name")} aria-invalid={touched.name && Boolean(errors.name)} aria-describedby={errors.name && touched.name ? "contact-name-error" : undefined} required /><small id="contact-name-error">{touched.name ? errors.name : ""}</small></label>
        <label className={`contact-field ${stateFor("email")}`}><span>WORK EMAIL</span><input name="email" type="email" inputMode="email" autoComplete="email" maxLength={fieldLimits.email} value={values.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => markTouched("email")} aria-invalid={touched.email && Boolean(errors.email)} aria-describedby={errors.email && touched.email ? "contact-email-error" : undefined} required /><small id="contact-email-error">{touched.email ? errors.email : ""}</small></label>
        <label className={`contact-field ${stateFor("company")}`}><span>COMPANY <i>OPTIONAL</i></span><input name="company" autoComplete="organization" maxLength={fieldLimits.company} value={values.company} onChange={(event) => updateField("company", event.target.value)} onBlur={() => markTouched("company")} aria-invalid={touched.company && Boolean(errors.company)} aria-describedby={errors.company && touched.company ? "contact-company-error" : undefined} /><small id="contact-company-error">{touched.company ? errors.company : ""}</small></label>
        <label className={`contact-field contact-field-message ${stateFor("message")}`}><span>WHAT SHOULD STAY INSIDE?</span><textarea name="message" rows={3} maxLength={fieldLimits.message} value={values.message} onChange={(event) => updateField("message", event.target.value)} onBlur={() => markTouched("message")} aria-invalid={touched.message && Boolean(errors.message)} aria-describedby={errors.message && touched.message ? "contact-message-error" : undefined} required /><small id="contact-message-error">{touched.message ? errors.message : ""}</small></label>
      </div>
      <div className="contact-form-action"><p aria-live="polite">{submitted ? <><Check size={13} /> MAIL CLIENT OPENING</> : "EMAIL DRAFT ONLY · THIS SITE DOES NOT STORE YOUR MESSAGE"}</p><button type="submit">SEND REQUEST <ArrowUpRight size={15} /></button></div>
    </form>
  </section>;
}
