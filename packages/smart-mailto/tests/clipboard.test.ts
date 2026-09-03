import { beforeEach, describe, expect, it, vi } from "vitest";
import { copyToClipboard } from "../src/core/clipboard";

describe("Clipboard Helper", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("copies text using navigator.clipboard when available", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      configurable: true,
      value: { writeText: writeTextMock },
    });

    const result = await copyToClipboard("hello@world.com");
    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith("hello@world.com");
  });

  it("falls back to document.execCommand if clipboard API throws", async () => {
    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error("Permission denied")),
      },
    });

    document.execCommand = vi.fn().mockReturnValue(true);

    const result = await copyToClipboard("fallback text");
    expect(result).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });

  it("returns false if text is empty", async () => {
    const result = await copyToClipboard("");
    expect(result).toBe(false);
  });
});
