import { test, expect } from '@playwright/test';
import { User } from "../types/types"
import Login from "../pages/login"

const user: User = {
  email: process.env.USER_EMAIL || "", 
  password: process.env.USER_PW || "",
  name: process.env.FULL_NAME || ""
}

test('[ui] testautomation login', async ({ page }) => {
  await page.goto('/login');
  const login = new Login(page)
  await login.signin(user)
  await login.isUserLogin(user.name)
});

test('[api] login with valid details', async ({ request }) => {
  const url = "https://automationexercise.com/api/verifyLogin"
  const resp = await request.post(url, {
    form: {
      email: user.email,
      password: user.password
    }
  })
  expect(resp.status()).toBe(200)
  expect((await resp.json())?.message).toBe("User exists!");
});

test('[api] login with invalid details', async ({ request }) => {
  const url = "https://automationexercise.com/api/verifyLogin"
  const resp = await request.post(url, {
    form: {
      email: user.email,
      password: `${user.password}1`
    }
  })
  expect(resp.status()).toBe(200)
  expect((await resp.json())?.message).toBe("User not found!");
});

test('[api] login without email parameter', async ({ request }) => {
  const url = "https://automationexercise.com/api/verifyLogin"
  const resp = await request.post(url, {
    form: {
      password: user.password
    }
  })
  expect(resp.status()).toBe(200)
  expect((await resp.json())?.message).toBe("Bad request, email or password parameter is missing in POST request.");
});

test('[api] delete to verify login', async ({ request }) => {
  const url = "https://automationexercise.com/api/verifyLogin"
  const resp = await request.delete(url)
  expect(resp.status()).toBe(200)
  expect((await resp.json())?.message).toBe("This request method is not supported.");
});