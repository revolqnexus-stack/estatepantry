import { expect, test } from "@playwright/test";

const sections = [
  { id: "story", text: "Seventy years old. Gently restored." },
  { id: "food", text: "Honest food. Nothing trendy." },
  { id: "menu", text: "Spiced Chicken Pizza" },
  { id: "estate", text: "Mist, tea, and unhurried afternoons." },
  { id: "visit", text: "Find us in the hills." },
  { id: "footer", text: "A Highland Circle project." },
];

test("scrolls the full page and shows every section", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("[data-loader]")).toBeHidden({ timeout: 4000 });

  for (const section of sections) {
    const block = page.locator(`#${section.id}`);
    await block.evaluate((node) => node.scrollIntoView({ block: "start" }));
    await expect(block.getByText(section.text).first()).toBeVisible();
    await expect
      .poll(async () =>
        Number(
          await block.locator("h2, p").first().evaluate((element) => getComputedStyle(element).opacity),
        ),
      )
      .toBeGreaterThan(0.9);

    if (section.id === "story") {
      const label = block.locator("dd", { hasText: "years of history" });
      await label.evaluate((node) => node.scrollIntoView({ block: "center" }));
      const labelBox = await label.boundingBox();
      const navBox = await page.getByRole("navigation", { name: "Visit" }).boundingBox();
      const hillBox = await block.locator("[data-hills]").boundingBox();
      expect(labelBox).toBeTruthy();
      expect(navBox).toBeTruthy();
      expect(hillBox).toBeTruthy();
      if (labelBox && navBox) {
        const overlaps =
          labelBox.x < navBox.x + navBox.width &&
          labelBox.x + labelBox.width > navBox.x &&
          labelBox.y < navBox.y + navBox.height &&
          labelBox.y + labelBox.height > navBox.y;
        expect(overlaps, "story stats overlap the sticky bar").toBe(false);
      }
      if (labelBox && hillBox) {
        expect(labelBox.y + labelBox.height, "story stats sit on the hills").toBeLessThanOrEqual(
          hillBox.y + 1,
        );
      }
    }

    if (section.id === "menu") {
      const track = block.locator("[data-track]");
      const before = await track.evaluate((element) => getComputedStyle(element).transform);
      const viewport = page.viewportSize();
      await page.mouse.move((viewport?.width ?? 390) / 2, (viewport?.height ?? 800) * 0.55);
      await page.mouse.wheel(0, 2000);
      await expect
        .poll(async () => track.evaluate((element) => getComputedStyle(element).transform))
        .not.toBe(before);
    }

    if (section.id === "footer") {
      const credit = block.getByText("Founders:");
      await credit.scrollIntoViewIfNeeded();
      await expect
        .poll(async () =>
          Number(await credit.evaluate((element) => getComputedStyle(element).opacity)),
        )
        .toBeGreaterThan(0.9);
    }

    await page.screenshot({
      path: testInfo.outputPath(`${section.id}.png`),
    });
  }
});
