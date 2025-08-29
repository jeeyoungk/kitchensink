import { describe, expect, it } from "vitest";
import { createTaggedString, urlTemplate, type EscapeFn } from "./urls";

describe("createTaggedString", () => {
  it("should create a tagged string with custom escape function", () => {
    const upperCaseEscape: EscapeFn = (value) => value.toUpperCase();
    const upperTemplate = createTaggedString(upperCaseEscape);

    const result = upperTemplate`Hello ${"world"}!`;
    expect(result).toBe("Hello WORLD!");
  });

  it("should handle multiple interpolated values", () => {
    const noEscape: EscapeFn = (value) => value;
    const template = createTaggedString(noEscape);

    const result = template`${"a"}-${"b"}-${"c"}`;
    expect(result).toBe("a-b-c");
  });

  it("should convert non-string values to strings", () => {
    const noEscape: EscapeFn = (value) => value;
    const template = createTaggedString(noEscape);

    const result = template`Number: ${42}, Boolean: ${true}`;
    expect(result).toBe("Number: 42, Boolean: true");
  });
});

describe("urlTemplate", () => {
  it("should encode URL components using encodeURIComponent", () => {
    const bar = "hello world";
    const baz = "foo/bar?test=1";

    const result = urlTemplate`/foo/${bar}/${baz}`;

    expect(result).toBe("/foo/hello%20world/foo%2Fbar%3Ftest%3D1");

    // Parse the templated string to verify it contains our expected values
    const urlParts = result.split("/");
    expect(urlParts).toMatchObject(["", "foo", "hello%20world", "foo%2Fbar%3Ftest%3D1"]);

    // Decode the encoded parts to verify they match original values
    expect(decodeURIComponent(urlParts[2])).toBe(bar);
    expect(decodeURIComponent(urlParts[3])).toBe(baz);
  });

  it("should handle special characters correctly", () => {
    const param = "test@example.com";

    const result = urlTemplate`/api/users/${param}`;

    expect(result).toBe("/api/users/test%40example.com");
  });

  it("should preserve literal parts of the template", () => {
    const id = "123";

    const result = urlTemplate`/foo/${id}/bar`;

    expect(result).toBe("/foo/123/bar");
  });

  it("should encode multiple path segments with special characters", () => {
    const segment1 = "with spaces";
    const segment2 = "with/slashes";
    const segment3 = "with?query&params=true";

    const result = urlTemplate`/api/${segment1}/${segment2}/${segment3}`;

    expect(result).toBe("/api/with%20spaces/with%2Fslashes/with%3Fquery%26params%3Dtrue");
  });

  it("should parse templated string and verify original values", () => {
    const originalValues = {
      userId: "user@domain.com",
      action: "create/update",
      params: "filter=active&sort=name",
    };

    const result = urlTemplate`/users/${originalValues.userId}/actions/${originalValues.action}?${originalValues.params}`;

    // Parse the URL structure
    const [baseUrl, queryString] = result.split("?");
    const pathParts = baseUrl.split("/");
    const [, users, encodedUserId, actions, encodedAction] = pathParts;

    expect(users).toBe("users");
    expect(actions).toBe("actions");

    // Verify that decoding gives us back our original values
    expect(decodeURIComponent(encodedUserId)).toBe(originalValues.userId);
    expect(decodeURIComponent(encodedAction)).toBe(originalValues.action);
    expect(decodeURIComponent(queryString)).toBe(originalValues.params);

    // Verify the complete structure matches expectation
    const expectedUrl = `/users/user%40domain.com/actions/create%2Fupdate?filter%3Dactive%26sort%3Dname`;
    expect(result).toBe(expectedUrl);
  });

  it("should handle non-string values and parse correctly", () => {
    const userId = 12345;
    const isActive = true;
    const score = 98.7;

    const result = urlTemplate`/users/${userId}/active/${isActive}/score/${score}`;

    // Parse the URL structure
    const urlParts = result.split("/");
    expect(urlParts).toMatchObject(["", "users", "12345", "active", "true", "score", "98.7"]);

    // Verify that parsed values match the original (converted to strings)
    expect(urlParts[2]).toBe(String(userId));
    expect(urlParts[4]).toBe(String(isActive));
    expect(urlParts[6]).toBe(String(score));

    // Verify the complete URL
    expect(result).toBe("/users/12345/active/true/score/98.7");
  });
});
