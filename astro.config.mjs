// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  // Disable image optimization - use images as-is without processing
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  integrations: [
    starlight({
      title: "NASA - Lunar Sample Compendium",
      // Override default Starlight components for custom left nav layout
      components: {
        Sidebar: "./src/components/Sidebar.astro",
        PageSidebar: "./src/components/PageSidebar.astro",
        MobileMenuToggle: "./src/components/MobileMenuToggle.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/bfeist/lsc_astro",
        },
      ],
      // Sidebar navigation structure for Apollo missions
      sidebar: [
        {
          label: "General",
          collapsed: true,
          autogenerate: { directory: "general" },
        },
        {
          label: "Apollo 11",
          collapsed: true,
          autogenerate: { directory: "apollo-11", collapsed: false },
        },
        {
          label: "Apollo 12",
          collapsed: true,
          autogenerate: { directory: "apollo-12", collapsed: false },
        },
        {
          label: "Apollo 14",
          collapsed: true,
          autogenerate: { directory: "apollo-14", collapsed: false },
        },
        {
          label: "Apollo 15",
          collapsed: true,
          autogenerate: { directory: "apollo-15", collapsed: false },
        },
        {
          label: "Apollo 16",
          collapsed: true,
          autogenerate: { directory: "apollo-16", collapsed: false },
        },
        {
          label: "Apollo 17",
          collapsed: true,
          autogenerate: { directory: "apollo-17", collapsed: false },
        },
      ],
    }),
  ],
});
