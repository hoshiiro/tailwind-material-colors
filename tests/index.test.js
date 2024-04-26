import { withMaterialColors } from "../src/index";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

const DARK_SELECTOR = "@media (prefers-color-scheme: dark)";

it("Generates the correct light-mode CSS", () => {
  const config = withMaterialColors(
    {
      content: [
        {
          raw: "text-on-primary-light bg-green-light/50 bg-primary-light interactive-bg-primary-light",
        },
      ],
    },
    {
      primary: "#ff0000",
      green: "#00ff00",
    }
  );

  let utilitiesCSS = postcss([tailwindcss(config)]).process(
    "@tailwind utilities"
  ).css;

  expect(utilitiesCSS.replace(/\n|\s|\t/g, "")).toBe(
    `
      .bg-green-light\\/50 {
        background-color: rgb(74 103 0 / 0.5)
      }
      .bg-primary-light {
        --tw-bg-opacity: 1;
        background-color: rgb(165 1 0 / var(--tw-bg-opacity))
      }
      .text-on-primary-light {
        --tw-text-opacity: 1;
        color: rgb(255 255 255 / var(--tw-text-opacity))
      }
      .bg-green-light\\/50 {
        --tw-bg-base: rgb(74 103 0 / 0.5)
      }
      .bg-primary-light {
        --tw-bg-opacity: 1;
        --tw-bg-base: rgb(165 1 0 / var(--tw-bg-opacity))
      }
    `.replace(/\n|\s|\t/g, "")
  );

  let componentsCSS = postcss([tailwindcss(config)]).process(
    "@tailwind components"
  ).css;

  expect(componentsCSS.replace(/\n|\s|\t/g, "")).toBe(
    `
      .bg-primary-light {
        --tw-text-opacity: 1;
        color: rgb(255 255 255 / var(--tw-text-opacity))
      }
      .interactive-bg-primary-light {
        background-color: rgb(165 1 0 / var(--tw-bg-opacity));
        --tw-bg-opacity: 1;
        --tw-bg-base: rgb(165 1 0 / var(--tw-bg-opacity));
        --tw-text-opacity: 1;
        color: rgb(255 255 255 / var(--tw-text-opacity));
        --tw-bg-mix-opacity: 1;
        background-color: color-mix(
          var(--tw-bg-mix-method, in srgb),
          rgb(255 255 255 / var(--tw-bg-mix-opacity)) calc(var(--tw-bg-mix-amount, 0) * 1%),
          var(--tw-bg-base)
        );
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms
      }
      .interactive-bg-primary-light:hover {
        --tw-bg-mix-amount: 8
      }
      .interactive-bg-primary-light:active {
        --tw-bg-mix-amount: 12
      }
      .interactive-bg-primary-light:focus-visible {
        --tw-bg-mix-amount: 12
      }
      .interactive-bg-primary-light:disabled {
        color: rgb(var(--color-on-surface) / 0.38);
        background-color: rgb(var(--color-on-surface) / 0.12);
        --tw-bg-base: rgb(var(--color-on-surface) / 0.12)
      }
    `.replace(/\n|\s|\t/g, "")
  );
});

it("Generates the correct mode-aware CSS", () => {
  const config = withMaterialColors(
    {
      content: [
        {
          raw: "text-on-primary bg-green/50 bg-primary interactive-bg-primary",
        },
      ],
    },
    {
      primary: "#ff0000",
      green: "#00ff00",
    }
  );

  let baseCSS = postcss([tailwindcss(config)]).process("@tailwind base").css;

  expect(baseCSS.replace(/\n|\s|\t/g, "")).toContain(
    `:root {
    --color-background: 255 248 246;
  `.replace(/\n|\s|\t/g, "")
  );
  expect(baseCSS.replace(/\n|\s|\t/g, "")).toContain(
    `${DARK_SELECTOR} {
      :root {
        --color-background: 33 14 11;
  `.replace(/\n|\s|\t/g, "")
  );

  let utilitiesCSS = postcss([tailwindcss(config)]).process(
    "@tailwind utilities"
  ).css;

  expect(utilitiesCSS.replace(/\n|\s|\t/g, "")).toBe(
    `
      .bg-green\\/50 {
        background-color: rgb(var(--color-green) / 0.5)
      }
      .bg-primary {
        --tw-bg-opacity: 1;
        background-color: rgb(var(--color-primary) / var(--opacity-primary, var(--tw-bg-opacity)))
      }
      .text-on-primary {
        --tw-text-opacity: 1;
        color: rgb(var(--color-on-primary) / var(--opacity-on-primary, var(--tw-text-opacity)))
      }
      .bg-green\\/50 {
        --tw-bg-base: rgb(var(--color-green) / 0.5)
      }
      .bg-primary {
        --tw-bg-opacity: 1;
        --tw-bg-base: rgb(var(--color-primary) / var(--opacity-primary, var(--tw-bg-opacity)))
      }
    `.replace(/\n|\s|\t/g, "")
  );

  let componentsCSS = postcss([tailwindcss(config)]).process(
    "@tailwind components"
  ).css;

  expect(componentsCSS.replace(/\n|\s|\t/g, "")).toBe(
    `
      .bg-primary {
        --tw-text-opacity: 1;
        color: rgb(var(--color-on-primary) / var(--opacity-on-primary, var(--tw-text-opacity)))
      }
      .interactive-bg-primary {
        background-color: rgb(var(--color-primary) / var(--opacity-primary, var(--tw-bg-opacity)));
        --tw-bg-opacity: 1;
        --tw-bg-base: rgb(var(--color-primary) / var(--opacity-primary, var(--tw-bg-opacity)));
        --tw-text-opacity: 1;
        color: rgb(var(--color-on-primary) / var(--opacity-on-primary, var(--tw-text-opacity)));
        --tw-bg-mix-opacity: 1;
        background-color: color-mix(
          var(--tw-bg-mix-method, in srgb),
          rgb(var(--color-on-primary) / var(--opacity-on-primary, var(--tw-bg-mix-opacity))) calc(var(--tw-bg-mix-amount, 0) * 1%),
          var(--tw-bg-base)
        );
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms
      }
      .interactive-bg-primary:hover {
        --tw-bg-mix-amount: 8
      }
      .interactive-bg-primary:active {
        --tw-bg-mix-amount: 12
      }
      .interactive-bg-primary:focus-visible {
        --tw-bg-mix-amount: 12
      }
      .interactive-bg-primary:disabled {
        color: rgb(var(--color-on-surface) / 0.38);
        background-color: rgb(var(--color-on-surface) / 0.12);
        --tw-bg-base: rgb(var(--color-on-surface) / 0.12)
      }
    `.replace(/\n|\s|\t/g, "")
  );
});
