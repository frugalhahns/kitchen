# Reset Kitchen

A weekly meal-prep and training site for two adults doing a low-carb reset, built
around one cook day a week, a freezer bank, and simple food from five cuisines that
works without sugar or grain.

Live at **https://frugalhahns.github.io/kitchen/**

## What it is

A four-week menu cycle that repeats for a twelve-week reset. One cuisine per week, so
one shop and one set of condiments covers it: Korean, Mexican, Middle Eastern, then a
light Spanish and American week that mostly comes out of the freezer.

**Sunday cooks exactly one thing.** One pot, big enough for three weeknight dinners
plus four bags for the freezer: short ribs, then a pork shoulder, then a pot of lentil
soup, then the big soup. Everything else on the cook day is a tray in the oven, a
dozen eggs, a sauce in the blender, and raw meat going into dated bags. Fifty minutes,
most of it the pot. The two nights the pot does not cover are a fifteen-minute pan in
cycle 1 and, once the bank exists, a bag pulled from the freezer instead.

- **This Week** - the dinner for every date, each one saying whether Sunday already
  cooked it or whether it needs a pan tonight, opening with the cook day that feeds
  the week, and ending in what is in the fridge and the date it has to be eaten by
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

The window is 10am to 6pm, one setting in `CONFIG.window`, with all three meal times
derived from it. It suits a morning lift (eat at 10, train, and the 2pm meal is the
post-session one) and finishes well clear of bedtime, which is the version that sits
best with fasting glucose.

## Fiber, and the legumes that were missing

The first version of this plan did not mention fiber once, and told you to skip the beans
at a taqueria. That was the biggest hole in it. Vegetables alone get to about 17g a day
against a 30 to 40g target; one cup of lentils or black beans closes the rest in a single
move, and viscous fiber is the one lever that works on LDL and on glucose at the same
time. Legumes are not grains and were never excluded by the protocol that worked in 2023,
they got swept out by low-carb habit. Lentil and chicken soup is now the highest-value
recipe on the site: 30g of protein and 12g of fiber a bowl, and it freezes for four
months.

## Soups and stews are the backbone

Not just one recipe. A pot is the most filling food per calorie there is, the only easy
way to eat two pounds of greens and a cup of lentils, and the thing that lets meat be the
flavoring rather than the foundation. It is also the best freezer food by a distance:
four months, thaws flat in twenty minutes, reheats indistinguishable. `soup-formula` is
the template rather than a recipe (protein plus legume plus aromatics plus greens plus
acid, four spice variants), and `bone-broth` turns the banked carcasses into the base for
all of it. The two honest caveats are on the Fuel page: a bowl is often 25 to 30g of
protein rather than 50, so pair it, and potato, dairy, rice and noodles do not survive
the freezer, so add those to the bowl instead of the pot.

## Stews are how the cholesterol side gets fixed

An audit found 2 stew dinners out of 20, after the README claimed stews were the
backbone. That gap was also why the saturated fat load stayed high: a stew is the
mechanism for cutting it without losing the meal. Eight ounces of beef across six bowls
of doenjang jjigae is a fraction of an eight ounce steak and the bowl still eats like
dinner. Now 5 of 20, with two new recipes chosen for exactly that: `doenjang-jjigae`
(tofu and vegetables carry it, meat is seasoning) and `turkey-bean-chili` (the best
protein, fiber and low-saturated-fat combination on the site). The chili also drops
Week 2 from two pork dinners to one.

The Fuel page carries an honest scorecard: strong for blood sugar, decent and improving
for cholesterol, with the things still working against it named rather than hidden.

## Every day gets its own afternoon meal

The `snack` field started life on the week rather than the day, which meant the same line
rendered all seven days. Combined with eggs at lunch and gyeranjjim at dinner, Thursday
of Week 1 was eggs three times. It is now per-day: 28 distinct afternoon meals, none
repeating the protein of that day's lunch or dinner. `/tmp/mealcheck.js`-style validation
catches regressions by tagging each meal's protein and flagging any that appears in all
three slots.

They are chosen for satiety rather than protein alone: yogurt with berries and chia for
the sweet craving, edamame and hummus for crunch and fiber, biltong for savory, a bowl of
soup when both numbers are short.

## Dairy is optional throughout

He is lactose intolerant, and cottage cheese was originally the first thing on the
afternoon protein list, which was wrong: a cup carries 6 to 8g of lactose, more than
Greek yogurt and far more than aged cheese. The list is now ordered with the no-lactose
options first and every week's afternoon meal defaults to something without dairy. The
Fuel page carries the ranking, the isolate-not-concentrate distinction for protein
powder, and the two-week elimination test.

## The protein mix

Every week is built to two fish nights, two chicken nights and two red meat nights, with
sardines at lunch as the second fish. That shape exists because of a high-cholesterol
history: protein source barely touches blood sugar, but saturated fat is the main dietary
lever on ApoB and individual response to it varies a lot. So the fattiest cuts are
anchors rather than staples, the big soup has a chicken version, and the plan says
explicitly what to change if the week 12 ApoB comes back up. See "The protein mix, with
your labs in mind" on the Plan page.

## The art

Each of the four cuisines has a tile tradition, so the motif comes from that rather than
from food illustration: **bojagi** patchwork for Korean, **Talavera** for Mexican, a
**khatam** eight-point star for Middle Eastern, an **azulejo** lattice for Spanish. Each
appears twice, from one definition in `ART`: tiled faintly as a ground behind the
masthead, and once at size as the week's emblem beside the eyebrow. Geometry only, no
raster assets, `currentColor` so it follows the week's accent, and masked to fade out
before it reaches the text. It is the same system as the accents, which is why it reads
as intentional rather than as decoration.

## Navigation

Below 700px the tab strip is replaced by a collapsible menu: a `<details>` showing the
current page, opening into the three groups (the week, the reasoning, the record) with
full-width tap targets. No JS to open it; the only script is closing it on Escape or an
outside tap. On the week view a "Today" button appears once today scrolls out of view,
driven by an IntersectionObserver.

## The interface

**A display serif carries the voice.** Headings and the masthead use a system serif
stack (Iowan Old Style, Palatino, Charter, Georgia) against sans for reading. No web
font request, so it stays a zero-dependency site, and it is most of what makes it feel
like a place rather than a document.

**The week paints the site.** Each cuisine owns an accent, applied as
`body[data-cuisine]` from the active week, so the site changes character as the cycle
rotates: gochugaru red for Korean, tomatillo green for Mexican, turmeric for Middle
Eastern, a Mediterranean blue for the Spanish and American week. All four are contrast
checked at >= 5:1 on cream and for white text sitting on them, in both modes. The chart
series colours are deliberately excluded from the theming, because colour there follows
the measure, not the context.

**The week view opens with a masthead** rather than an h1 and a paragraph: a bled
watermark numeral, a radial wash in the week's accent, and a facts row (stew nights,
cook day and time, the dinner protein mix, freezer kinds) with the mix derived from the
same tagger that labels the meals.

Plus a paper grain over the cream, a rail down the cook-day timeline, cards that lift on
hover and stagger in on load, accent ticks on section rules, and a focus ring that is
visible everywhere and removed nowhere.

## The interface

One type scale, one spacing scale, and hairlines doing the separating instead of a
shadow on every card. The specifics worth knowing:

- **A day is one dinner.** The card carries the dinner, a badge, and the line for the
  8-year-old. That is all. Charlie's 10am and 2pm, the post-lift note and the day note
  are behind one closed toggle at the foot of the card, because they are his and not
  the household's. Nothing on the card explains itself in a sentence where a badge
  does the job.
- **Every dinner says how it happens, in two words.** `src` on each day is `sunday`,
  `assemble`, `fresh`, `free` or `cookday`, and `mins` is the work that night. It
  renders as a badge and nothing else: `MADE SUNDAY`, `COOK TONIGHT, 15 MIN`, `NO
  COOKING, 10 MIN`. Green for cooking already done, the week's accent for a pan
  tonight, gold for the free meal. The masthead line and the list on the Cook Day page
  derive from the same field, so they cannot disagree with the cards.
- **Reading matter folds away.** Anything needed once rather than weekly sits behind a
  `details.ref`, which looks exactly like an `h2` and opens on a tap: the market slots,
  the month-by-month produce, the market rules, the pantry order, the six cook-day
  rules, and the paragraph about why the week is shaped the way it is. The Shopping
  page went from five sections of prose to a checklist and four closed folds. The four
  pages under Charlie's plan are deliberately still essays; that is what they are for.
- **The plan visibly gets easier.** Nights marked `bank` in the data are a quick cook
  while the freezer is empty and render as `FROM THE FREEZER` from cycle 2 onward, off
  `resetState()`. Week 1 Friday says "cook tonight, 5 min" in October and "from the
  freezer" in November without anyone editing anything. That progression was the point
  of banking and it used to be something the site only asserted in prose.
- **The grid opens with the cook day.** Two Sundays are in play in any week: the one
  before Monday that makes the food, and the one at the end that starts the next week.
  The first is a card of its own at the head of the grid; the second says which week it
  is cooking for and links to that plan.
- **Protein tags** (`FISH`, `BEEF`, `PLANT`) are derived from the meal text at render
  time by `proteinTag()`, never stored, so a tag cannot drift out of sync with the food.
  They make the week's variety scannable, and they immediately exposed a logic bug:
  Wednesday lunch was "cold salmon" on a day the salmon is not cooked until dinner.
- **Three-column week** on wide screens, two on tablet, one on phone. Today gets an
  accent ring; past days recede; the free meal Saturday gets a gold wash.
- **Nav is grouped** into the week, Charlie's plan, and the record, so anyone else
  cooking from this can see at a glance which four pages are theirs. Long pages get a
  jump nav so they stop being a wall.
- **Charts follow the dataviz spec:** two single-series small multiples rather than a
  dual axis, 2px lines, r=4 markers with a 2px surface ring, a solid hairline target
  rule (dashed reads as "projection"), endpoint-only direct labels, and a hover
  tooltip. The series palette is validated by script in both modes, not eyeballed:
  `#b8402b`/`#4a72b0` light and `#d96248`/`#5f8fd0` dark, all six checks passing with
  worst-adjacent CVD dE 20. The original terracotta-and-green pair failed at dE 4.9.
- Prose is capped near 72ch, big stat values use proportional figures (tabular
  loosens large numerals), and there are print styles because the shopping list is
  the page people print.

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
| Change the one pot | `pot` on the week (a `RECIPES` id), plus `potName` if the week runs a variant |
| Swap a dinner | the `days` array inside the week in `WEEKS`, and set `src` / `mins` to match |
| Make a night flip to the freezer later | `bank: true` on that day |
| Change how a dinner happens | `src` on the day: `sunday`, `assemble`, `freezer`, `fresh`, `free`, `cookday` |
| Add a recipe | a new key in `RECIPES`, then reference its id as `m2r` or in `also` on a day |
| Change a shelf life | `keep: { fridge, freezer }` on the recipe, or the `KEEPS.table` row |
| Change what is in the fridge and by when | the `keeps` array on the week |
| Change what gets banked | the `freezer` array on the week, `{ what, months }` |
| Change lift days | `CONFIG.liftDays` |
| Change the eating window | `CONFIG.window` (first / snack / dinner / end) |
| Change the afternoon meal | `snack` on each week |
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
