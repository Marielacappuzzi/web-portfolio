"use client";

import { useMemo, useState } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js/min";
import es from "react-phone-number-input/locale/es.json";
import { cn } from "@/lib/cn";

interface PhoneFieldProps {
  id: string;
  name: string;
  describedBy?: string;
  disabled?: boolean;
  className: string;
  /** Preselected country. Mariela works from Santa Cruz de la Sierra. */
  defaultCountry?: string;
}

const names = es as Record<string, string>;

/**
 * Telephone, with an international dialling code.
 *
 * The country list, the calling codes and the Spanish country names all come
 * from `react-phone-number-input` and the `libphonenumber-js` metadata it
 * bundles — 245 territories kept current by the package rather than by a list
 * pasted into this repository.
 *
 * Its ready-made component is not used, only its data. That component ships
 * its own stylesheet and markup, which would have imported a second visual
 * language into a form built entirely from the site's own tokens. A native
 * `<select>` and a native `<input type="tel">` give the same behaviour, stay
 * keyboard and screen-reader correct for free, and look like everything else.
 *
 * One hidden input carries the joined value, so the server receives a single
 * `telefono` field and nothing downstream needs to know this widget exists.
 * The field is optional: with no number typed it submits empty rather than a
 * bare dialling code, which would look like data and be worth nothing.
 */
export function PhoneField({
  id,
  name,
  describedBy,
  disabled,
  className,
  defaultCountry = "BO",
}: PhoneFieldProps) {
  const [country, setCountry] = useState(defaultCountry);
  const [number, setNumber] = useState("");

  const countries = useMemo(() => {
    return getCountries()
      .map((code) => ({
        code,
        name: names[code] ?? code,
        prefix: `+${getCountryCallingCode(code)}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, []);

  const prefix = `+${getCountryCallingCode(country as never)}`;
  const digits = number.replace(/[^\d]/g, "");

  return (
    <div className="flex items-stretch gap-2xs">
      <span className="sr-only" id={`${id}-pais`}>
        Código de país
      </span>
      <select
        aria-labelledby={`${id}-pais`}
        value={country}
        disabled={disabled}
        onChange={(event) => setCountry(event.target.value)}
        className={cn(className, "w-[7.5rem] shrink-0 pr-2")}
      >
        {countries.map((item) => (
          <option key={item.code} value={item.code}>
            {item.prefix} · {item.code}
          </option>
        ))}
      </select>

      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={number}
        disabled={disabled}
        aria-describedby={describedBy}
        onChange={(event) => setNumber(event.target.value)}
        className={cn(className, "min-w-0 flex-1")}
      />

      <input type="hidden" name={name} value={digits ? `${prefix} ${digits}` : ""} />
    </div>
  );
}
