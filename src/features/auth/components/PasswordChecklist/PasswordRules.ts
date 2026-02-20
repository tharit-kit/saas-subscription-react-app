import type { PasswordRule } from "../../interfaces/interfaces";

export const passwordRules: PasswordRule[] = [
  { id: "minLength", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "lower", label: "Contains a lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "upper", label: "Contains an uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "num", label: "Contains a number", test: (p) => /\d/.test(p) },
  { id: "sym", label: "Contains a symbol", test: (p) => /[^A-Za-z0-9]/.test(p) },
  { id: "noSpace", label: "No spaces", test: (p) => !/\s/.test(p) },
];

export function evaluate(password: string, rules: PasswordRule[]) {
  return rules.map((r) => ({ ...r, passed: r.test(password) }));
}

export function allRulesPassed(password: string, rules: PasswordRule[]) {
  return rules.every((r) => r.test(password));
}