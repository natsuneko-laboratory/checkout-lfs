import { getInput } from "@actions/core";

export function getUrlInput(): string {
  return getInput("url", { required: true });
}

export function getAuthInput(): boolean {
  return getInput("auth", { required: false }) === "true";
}

export function getCredentialInput(): string {
  return getInput("credential", { required: false });
}
