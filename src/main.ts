import { setFailed } from "@actions/core";
import shell from "shelljs";
import { getAuthInput, getCredentialInput, getUrlInput } from "./input";

async function configureCredentials() {
  const url = getUrlInput();
  const credential = getCredentialInput();

  shell.exec(`git config --global credential.${url}.username $GITHUB_ACTOR`);

  const func = `!f() { test "$1" = get && echo "password=${credential}"; }; f`;
  shell.exec(`git config --global credential.${url}.helper '${func}'`);
}

async function configureLfs() {
  shell.exec(`git config --global lfs.repositoryformatversion 0`);

  const url = getUrlInput();
  const auth = getAuthInput();

  if (auth) {
    shell.exec(
      `git config --global lfs.${url}/$GITHUB_REPOSITORY/.access basic`
    );
  }

  shell.exec(
    `git config --global lfs.${url}/$GITHUB_REPOSITORY/.locksverify false`
  );
}

async function installLfsHooks() {
  shell.exec(`git lfs install`);
}

async function pullLfs() {
  shell.exec(`git lfs pull`);
}

async function main() {
  try {
    const auth = getAuthInput();
    if (auth) {
      await configureCredentials();
    }

    await configureLfs();
    await installLfsHooks();
    await pullLfs();
  } catch (err) {
    if (err instanceof Error) setFailed(err.message);
  }
}

main();
