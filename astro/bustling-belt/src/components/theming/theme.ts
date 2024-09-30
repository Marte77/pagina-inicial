import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

// Get the theme from a hex color
const theme = themeFromSourceColor(argbFromHex('#EC00FF'));

// Check if the user has dark mode turned on
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (e) => {
    applyTheme(theme, {target: document.getElementById("swag")!, dark: e.matches ? true : false});
});

// Apply the theme to the body by updating custom properties for material tokens
export { theme, systemDark, applyTheme}