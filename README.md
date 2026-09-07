# Reset Kitchen

A weekly meal-prep and training site for two adults doing a strict low-carb reset,
built around batch cooking on Sunday and Korean food that works without sugar or rice.

Live at **https://frugalhahns.github.io/kitchen/**

## What it is

A four-week menu cycle that repeats for a twelve-week reset. Every week has a timed
Sunday batch-cook plan, a shopping list split by store, five weeknight dinners built
from what you cooked, and a note for the kid who is not eating any of it.

- **This Week** - the seven days, with today highlighted and the current lift days marked
- **Cook Day** - the Sunday playbook as a timed checklist, ordered so the oven and the
  boiling water each get used twice
- **Shopping** - checkable list by store section, prints cleanly
- **Recipes** - 33 dishes, each with the modification that makes it sugar-free and
  grain-free, plus a link to the full original recipe
- **Training** - four days on the Tonal, the food timing around it, and the walking
- **The Plan** - the rules, why each one is there, and what to do when it stalls
- **Eating Out** - how to order at six kinds of restaurant, and the fifteen-minute
  meals to read first
- **Freezer** - a running count of what is banked
- **Progress** - weight, waist and lab dates

## The one idea worth stealing

Almost no Korean recipe online is written for a low-carb diet, because the cuisine
leans hard on sugar, corn syrup, rice syrup and gochujang. Two swaps fix nearly all of it:

- **Allulose** in place of sugar and syrups. It browns and caramelizes like sugar and
  does not raise blood glucose, so galbi marinade, bulgogi and jorim all survive intact.
- **Gochugaru plus doenjang** in place of gochujang, which is fermented with rice and
  sweetened. You lose the gloss and keep the flavor.

Every recipe page states its own version of this in a "Reset version" box.

## Editing it

No build step, no dependencies, no framework. Everything the site displays lives in
[`data/plan.js`](data/plan.js): `CONFIG`, `RECIPES`, `WEEKS`, `PROTOCOL`, `PANTRY`,
`EATOUT`, `TRAINING`. Edit that file, commit, and GitHub Pages picks it up in a minute.

Common edits:

| What | Where |
| --- | --- |
| Move the start date | `CONFIG.cycleStart` (must be a Monday) |
| Change reset length | `CONFIG.resetWeeks` |
| Fix the birthday | `CONFIG.birthday` |
| Swap a dinner | the `days` array inside the week in `WEEKS` |
| Add a recipe | a new key in `RECIPES`, then reference its id as `m2r` on a day |
| Change lift days | `CONFIG.liftDays` |

To preview locally:

```sh
python3 -m http.server 8777
# then open http://localhost:8777/
```

## Privacy

Checkboxes, freezer counts, session logs and weight entries are stored in
`localStorage` in whoever's browser is looking at it. Nothing is uploaded, there is no
backend, and no personal or medical information is committed to this repo. The site is
public because GitHub Pages on a free account has no password option; if that ever
needs to change, the path is Cloudflare Pages plus Cloudflare Access.

## Not medical advice

This is a meal plan written for one person who has run this protocol before and had the
bloodwork to show it worked. Cutting carbohydrates this sharply while taking
glucose-lowering medication can drop you too low, so that conversation belongs with a
doctor first.
