# Reset Kitchen

A weekly meal-prep and training site for two adults doing a low-carb reset, built
around one cook day a week, a freezer bank, and simple food from five cuisines that
works without sugar or grain.

Live at **https://frugalhahns.github.io/kitchen/**

## What it is

A four-week menu cycle that repeats for a twelve-week reset. One cuisine per week, so
one shop and one set of condiments covers it: Korean, Mexican, Middle Eastern, then a
light Spanish and American week that mostly comes out of the freezer.

- **This Week** - the seven days, with today highlighted, lift days marked, the free
  meal on Saturday, and what is in the fridge with the date it has to be eaten by
- **Cook Day** - the Sunday playbook as a timed checklist, 45 to 85 minutes depending
  on the week, ending in what should be in the fridge and what should be banked
- **Shopping** - farmers market by slot rather than by named vegetable, plus what is
  actually at a market in September, October and November
- **Recipes** - 29 dishes, none over eight ingredients or four steps, each with its
  fridge and freezer life and the modification that keeps it free of sugar and grain
- **Fuel** - the honest answer on losing fat while gaining muscle, a calorie and protein
  calculator that stores nothing outside the browser, and the third eating occasion
- **Training** - four days on the Tonal, the food timing around it, and the walking
- **The Plan** - the rules, why each one is there, and what to do when it stalls
- **Eating Out** - how to take the free meal, then how to order at seven kinds of
  restaurant, and the fifteen-minute meals to read before opening a delivery app
- **Storage** - a dated freezer inventory that flags what is past its window, what a
  full bank looks like, plus the shelf-life table and the thawing rules
- **Progress** - weight, waist and lab dates

## The three ideas worth stealing

**Cook once, eat it all week.** Sunday makes one big main plus a backup protein and two
sauces. Monday through Friday is the same food on a different plate. Eating the same
dinner twice is a feature, because a Tuesday with no decision in it is a Tuesday that
cannot go wrong.

**One method, four cuisines.** The sheet-pan chicken, the ground beef and the big soup
are one recipe each with four spice variants. Gochugaru makes it Korean, cumin and lime
make it Mexican, and nothing else about the method changes. This is most of where the
variety comes from and it costs nothing in effort.

**A free meal is in the plan, not a failure of it.** One meal a week, chosen in advance,
pizza included. The earlier version of this plan had no exception in it and that is
exactly why it did not survive. A plan run at seventy percent for a year beats one run
perfectly for five weeks.

## Three eating occasions, not two

The plan originally ran two meals inside a 16:8 window, which quietly delivered about
120g of protein against its own 170g target, at a deficit steep enough to cost muscle.
That is a fat-loss plan, not the recomposition it claimed. The fix is a protein meal at
3:30pm, inside the existing window rather than as breakfast, because the overnight
fasting hours are doing real work on fasting glucose. Each week has its own version built
around whichever sauce jar is already open, and the Fuel page carries the arithmetic.

## The protein mix

Every week is built to two fish nights, two chicken nights and two red meat nights, with
sardines at lunch as the second fish. That shape exists because of a high-cholesterol
history: protein source barely touches blood sugar, but saturated fat is the main dietary
lever on ApoB and individual response to it varies a lot. So the fattiest cuts are
anchors rather than staples, the big soup has a chicken version, and the plan says
explicitly what to change if the week 12 ApoB comes back up. See "The protein mix, with
your labs in mind" on the Plan page.

## Editing it

No build step, no dependencies, no framework. Everything the site displays lives in
[`data/plan.js`](data/plan.js): `CONFIG`, `RECIPES`, `WEEKS`, `PROTOCOL`, `PANTRY`,
`MARKET`, `KEEPS`, `EATOUT`, `TRAINING`. Edit that file, commit, and GitHub Pages picks
it up in a minute.

Common edits:

| What | Where |
| --- | --- |
| Move the start date | `CONFIG.cycleStart` (must be a Monday) |
| Change reset length | `CONFIG.resetWeeks` |
| Fix the birthday | `CONFIG.birthday` |
| Swap a dinner | the `days` array inside the week in `WEEKS` |
| Add a recipe | a new key in `RECIPES`, then reference its id as `m2r` or in `also` on a day |
| Change a shelf life | `keep: { fridge, freezer }` on the recipe, or the `KEEPS.table` row |
| Change what is in the fridge and by when | the `keeps` array on the week |
| Change what gets banked | the `freezer` array on the week, `{ what, months }` |
| Change lift days | `CONFIG.liftDays` |
| Move the afternoon meal | `CONFIG.snackTime`, and `snack` on each week |
| Change the protein target | `CONFIG.proteinTarget`, which the Fuel page checks against |
| Move the free meal | `CONFIG.freeMealDay`, and the `free: true` day in `WEEKS` |

To preview locally:

```sh
python3 -m http.server 8777
# then open http://localhost:8777/
```

## Privacy

Checkboxes, the freezer inventory, session logs and weight entries are stored in
`localStorage` in whoever's browser is looking at it. Nothing is uploaded, there is no
backend, and no personal or medical information is committed to this repo. The site is
public because GitHub Pages on a free account has no password option; if that ever
needs to change, the path is Cloudflare Pages plus Cloudflare Access.

## Not medical advice

This is a meal plan written for one person who has run this protocol before and had the
bloodwork to show it worked. Cutting carbohydrates this sharply while taking
glucose-lowering medication can drop you too low, so that conversation belongs with a
doctor first.
