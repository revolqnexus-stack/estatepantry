import { expect, test } from "@playwright/test";

test("hero, loader, and sticky bar", async ({ page }, testInfo) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (text.includes("favicon") || text.includes("_next/hmr")) return;
    pageErrors.push(text);
  });

  await page.goto("/");

  const loader = page.locator("[data-loader]");
  await expect(loader).toBeVisible();

  await expect(page.getByRole("link", { name: "ESTATE PANTRY" })).toBeVisible();
  const siteNav = page.getByRole("navigation", { name: "Site" });
  await expect(siteNav.getByRole("link", { name: "Menu" })).toBeVisible();
  await expect(siteNav.getByRole("link", { name: "Visit" })).toBeVisible();
  await expect(page.getByText("Now open")).toBeVisible();
  await expect(
    page
      .getByText(
        "Kanjar–Pullikanam–Vagamon Road, Pullikanam Tea Estate, Vagamon, Kerala",
      )
      .first(),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Slow living" })).toBeVisible();
  const visitBar = page.getByRole("navigation", { name: "Visit" });
  await expect(visitBar).toBeVisible();
  await expect(visitBar.getByRole("button", { name: "WhatsApp" })).toBeVisible();
  await expect(visitBar.getByRole("button", { name: "Call" })).toBeVisible();
  await expect(visitBar.getByRole("button", { name: "Directions" })).toBeVisible();

  const mobile = testInfo.project.name === "mobile";
  const video = page.locator("#hero video:visible");
  await expect(video).toHaveAttribute(
    "poster",
    mobile ? "/images/hero-poster-mobile.jpg" : "/images/hero-poster.jpg",
  );
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentSrc))
    .toContain(mobile ? "/video/hero-mobile.mp4" : "/video/hero.mp4");

  await expect(loader).toBeHidden({ timeout: 4000 });
  await expect(page.locator("[data-word]").first()).toHaveCSS("opacity", "1");

  const headingBox = await page.getByRole("heading", { name: "Slow living" }).boundingBox();
  const navBox = await page.getByRole("navigation", { name: "Visit" }).boundingBox();
  expect(headingBox).toBeTruthy();
  expect(navBox).toBeTruthy();
  if (headingBox && navBox) {
    const overlaps =
      headingBox.x < navBox.x + navBox.width &&
      headingBox.x + headingBox.width > navBox.x &&
      headingBox.y < navBox.y + navBox.height &&
      headingBox.y + headingBox.height > navBox.y;
    expect(overlaps, "headline overlaps the sticky bar").toBe(false);
  }

  const wordmark = await page.getByRole("link", { name: "ESTATE PANTRY" }).boundingBox();
  const heading = await page.getByRole("heading", { name: "Slow living" }).boundingBox();
  if (wordmark && heading) {
    const overlaps =
      wordmark.x < heading.x + heading.width &&
      wordmark.x + wordmark.width > heading.x &&
      wordmark.y < heading.y + heading.height &&
      wordmark.y + wordmark.height > heading.y;
    expect(overlaps, "wordmark overlaps the headline").toBe(false);
  }

  expect(pageErrors, pageErrors.join("\n")).toEqual([]);

  await page.screenshot({
    path: testInfo.outputPath(`${testInfo.project.name}.png`),
    fullPage: false,
  });
});

test("skips the loader on a repeat visit", async ({ page }) => {
  await page.context().addCookies([
    {
      name: "estate-pantry-visited",
      value: "1",
      url: "http://localhost:3000",
    },
  ]);
  await page.goto("/");
  await expect(page.locator("[data-loader]")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Slow living" })).toBeVisible();
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows the hero without the loader", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-loader]")).toBeHidden();
    await expect(page.getByRole("heading", { name: "Slow living" })).toBeVisible();
    await expect
      .poll(() =>
        page.locator("#hero video:visible").evaluate((node: HTMLVideoElement) => node.paused),
      )
      .toBe(true);
  });
});
