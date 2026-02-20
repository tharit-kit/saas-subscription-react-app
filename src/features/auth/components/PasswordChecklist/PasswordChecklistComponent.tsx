// PasswordChecklist.tsx
import { useMemo } from "react";
import type { PasswordRule } from "../../interfaces/interfaces";
import { evaluate } from "./PasswordRules";

export function PasswordChecklist({ password, rules }: { password: string; rules: PasswordRule[] }) {
  const results = useMemo(() => evaluate(password, rules), [password, rules]);

  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
      {results.map((r) => (
        <li key={r.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <i
            className={`pi ${
              r.passed ? "pi-check text-green-500" : "pi-times text-red-400"
            }`}
          />
          <span style={{ color: r.passed ? "green" : "#6b7280" }}>{r.label}</span>
        </li>
      ))}
    </ul>
  );
}
