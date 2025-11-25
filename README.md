# Lunar Sample Compendium

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

A comprehensive online catalog documenting lunar samples returned by the Apollo missions (1969-1972) and the Soviet Luna program. This compendium provides detailed information about 2,196 documented samples of soils and rocks weighing 382 kilograms total, collected during humanity's most ambitious exploration program.

## 🌙 About

The Lunar Sample Compendium serves to inform scientists, students, astronauts, and the public about the various lunar samples returned from the Moon. Organized rock by rock, this resource provides:

- Sample descriptions with thin section photomicrographs
- Tables of modal mineralogy and chemical data
- Trace element data plots and isochrons
- Lunar surface photography of samples in situ
- References to scientific literature and detailed studies

### Apollo Missions Covered

- **Apollo 11** - Mare Tranquillitatis (1969)
- **Apollo 12** - Oceanus Procellarum (1969)
- **Apollo 14** - Fra Mauro Formation (1971)
- **Apollo 15** - Hadley-Apennine (1971)
- **Apollo 16** - Descartes Highlands (1972)
- **Apollo 17** - Taurus-Littrow Valley (1972)

Plus samples from the Soviet Luna 16, 20, and 24 missions.

## 🚀 Project Structure

```
.
├── public/              # Static assets (favicons, images)
├── src/
│   ├── assets/         # Images embedded in documentation
│   ├── content/
│   │   └── docs/       # Documentation organized by mission
│   │       ├── index.md
│   │       ├── apollo-11/
│   │       ├── apollo-12/
│   │       ├── apollo-14/
│   │       ├── apollo-15/
│   │       ├── apollo-16/
│   │       ├── apollo-17/
│   │       └── general/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📚 Content Organization

Each lunar sample is documented with:

- Sample number and classification
- Collection location and geological context
- Petrographic descriptions
- Mineralogical composition
- Chemical analyses
- Age dating results
- Scientific references

## 🔬 Sample Types

The compendium includes:

- **Basalts** - Crystallized lava flows (3.2-3.9 billion years old)
- **Breccias** - Impact-generated lithified debris
- **Plutonic Rocks** - Ferroan anorthosites, norites, troctolites
- **Soils** - Fine regolith material
- **Glasses** - Volcanic beads, impact melt, agglutinates
- **Core Samples** - Deep drill cores and drive tubes

## 🌐 Resources

- [NASA Lunar Sample Curator](http://www-curator.jsc.nasa.gov/lunar/)
- [Lunar and Planetary Institute](https://www.lpi.usra.edu/)
- [Lunar Sourcebook](http://www.lpi.usra.edu/lunar_sourcebook/)

## 📄 License

Documentation content sourced from NASA and the scientific community's decades of lunar sample research.

---

*"We came in Peace, for all Mankind"* - Apollo 11 Plaque
