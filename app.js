// app.js — the one interactive feature: "Used where?"
// A visitor picks a tool (Power BI, VBA, Excel, SAS, R). Rows that use it stay bright and open;
// everything else fades. Which tool goes with which bullet is written in the HTML as
// data-tools="..." — taken only from what the résumé says, so nothing here is invented.

// Wait until the page's HTML has loaded before looking for buttons and rows.
document.addEventListener("DOMContentLoaded", function () {
  // Find the tool bar. Only the home page has one; on other pages, stop here.
  const bar = document.querySelector("[data-tool-bar]");
  // If there is no tool bar on this page, there is nothing to set up.
  if (!bar) return;

  // All the tool buttons (Power BI, VBA, ...), as a list.
  const buttons = Array.from(bar.querySelectorAll("button[data-tool]"));
  // The "Show all" button that clears the choice.
  const clearBtn = bar.querySelector("[data-clear]");
  // The sentence that says how many places matched (shown in a bar at the bottom of the screen).
  const status = bar.querySelector("[data-status]");
  // The "See where" link in that bar; it jumps to the first matching row.
  const jump = bar.querySelector("[data-jump]");
  // Every experience/project row that the filter can fade or highlight.
  const items = Array.from(document.querySelectorAll(".item"));
  // The <main> element; adding a class to it switches on the "filtering" styles.
  const main = document.querySelector("main");

  // Remember each row's open/closed state before filtering, so "Show all" can restore it.
  const wasOpen = new Map();

  // Turn a space-separated attribute like "powerbi vba" into a list ["powerbi", "vba"].
  function toolsOf(el) {
    // Read the attribute (or an empty string if missing), split on spaces, drop blanks.
    return (el.getAttribute("data-tools") || "").split(" ").filter(Boolean);
  }

  // Apply a choice. `tool` is a key like "powerbi", or null for "show everything".
  function select(tool) {
    // Update every button so exactly one (or none) is shown as pressed.
    buttons.forEach(function (b) {
      // aria-pressed tells screen readers and our CSS which button is on.
      b.setAttribute("aria-pressed", String(b.dataset.tool === tool));
    });

    // No tool chosen: undo all highlighting and put rows back how they were.
    if (!tool) {
      // Remove the switch that turns on the fade/highlight styles.
      main.classList.remove("filtering");
      // Go through every row.
      items.forEach(function (item) {
        // Un-fade it.
        item.classList.remove("dim");
        // Find its expandable <details> box.
        const d = item.querySelector("details");
        // Restore its earlier open/closed state, if we saved one.
        if (d && wasOpen.has(item)) d.open = wasOpen.get(item);
      });
      // Clear every highlighted bullet and tag.
      document.querySelectorAll(".hit").forEach(function (el) { el.classList.remove("hit"); });
      // Hide the "Show all" button; there is nothing to clear.
      clearBtn.hidden = true;
      // Hide the "See where" link too.
      jump.hidden = true;
      // Empty the status sentence.
      status.textContent = "";
      // Forget saved states so the next filter saves fresh ones.
      wasOpen.clear();
      // Done.
      return;
    }

    // A tool was chosen: switch on the filtering styles.
    main.classList.add("filtering");
    // Count how many rows use this tool, for the status sentence.
    let count = 0;
    // Remember the first matching row, so "See where" can jump straight to it.
    let first = null;

    // Look at every row.
    items.forEach(function (item) {
      // Its <details> box (the part that opens).
      const d = item.querySelector("details");
      // The first time we filter, remember whether this row was open.
      if (d && !wasOpen.has(item)) wasOpen.set(item, d.open);
      // Does this row use the chosen tool?
      const match = toolsOf(item).includes(tool);
      // Fade the row if it does not match.
      item.classList.toggle("dim", !match);
      // Open matching rows so the evidence is visible; close the rest.
      if (d) d.open = match;
      // Add one to the count for each match.
      if (match) count++;
      // Keep the first match we find (rows are in page order, so this is the highest one).
      if (match && !first) first = item;
      // Inside the row, tint the exact bullets and tags that mention this tool.
      item.querySelectorAll("[data-tools]").forEach(function (el) {
        // Skip the row itself; we only want the bullets/tags inside it.
        if (el === item) return;
        // Highlight only the pieces that list this tool.
        el.classList.toggle("hit", toolsOf(el).includes(tool));
      });
    });

    // Show the "Show all" button.
    clearBtn.hidden = false;
    // Point "See where" at the first matching row (each row has an id like "exp-conedison").
    if (first) jump.href = "#" + first.id;
    // Show the "See where" link.
    jump.hidden = false;
    // Find the button that was pressed, to use its visible name (e.g. "Power BI").
    const label = buttons.find(function (b) { return b.dataset.tool === tool; }).textContent;
    // Write the sentence, using "place" or "places" correctly.
    status.textContent = label + ": " + count + (count === 1 ? " place" : " places") + " highlighted";
  }

  // Connect each tool button to the select() function.
  buttons.forEach(function (b) {
    // When clicked...
    b.addEventListener("click", function () {
      // ...if it was already on, turn it off; otherwise turn it on.
      select(b.getAttribute("aria-pressed") === "true" ? null : b.dataset.tool);
    });
  });

  // "Show all" clears the choice.
  clearBtn.addEventListener("click", function () { select(null); });
});
