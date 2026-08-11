/**
 * About-page copy.
 *
 * This is the only writing on the site that isn't drawn from the resume or the
 * case-study boards, so it's the page most worth making your own. Read it
 * properly and change anything that doesn't sound like you.
 */

export const about = {
  heading: "Who I am beyond design",

  portrait: {
    src: "/images/profile/aadesh-portrait.jpg",
    alt: "Aadesh Singh standing under prayer flags in Sagarmatha Bazaar",
  },

  lead: "I design the kind of software people use because they have to, not because they want to.",

  body: [
    "That changes the job. Nobody explores a trading terminal for fun, and nobody reads the onboarding for an app their employer handed them. People open these things with one specific thing in mind and they want to be finished. So most of my work is working out what that thing is, then clearing everything else out of the way.",
    "Which means a lot of time before any screens exist. Sitting with the people who actually do the job, watching where they slow down, asking to see the spreadsheet they built to get around the software. The interesting problems are almost never the ones written in the brief. They turn up in the workarounds.",
    "After that it becomes a question of what to leave out. Every product I have worked on could put ten more numbers on the first screen, and every one of them is better for putting two. Getting a room full of people to agree on which two is the real work, and it usually takes longer than the design does.",
    "I also stay close to the build. A design that survives a real dataset, a slow connection and a developer asking why is worth more than one that only holds up in Figma. Most of what I know about designing systems, I learned from watching mine break.",
  ],

  inspiration: {
    heading: "My inspirations and interests",
    body: [
      "I travel when I can and take pictures wherever I go, though not really for the landmarks. What I come back with is things that may look pretty ordinary at first glance, moments that would probably go unnoticed otherwise, but if you take a moment to observe, they'll probably be some of the most beautiful things you'll ever see. Photography, for me, is just the habit of looking at something long enough to notice it was beautiful all along.",
      "That habit is most of what I bring to work. Enterprise software is full of ordinary moments. Waiting for a report to finish processing. Correcting a category the system guessed wrong. Checking the same number for the fourth time this week. None of it makes it into a case study, but it is where people actually spend their day, and it is usually the part nobody has bothered to look at.",
      "So that is where I like to spend my time. Making a loading state say something worth reading. Making a correction take one tap instead of four. Putting the number you keep checking where your eye already goes. None of it looks like much in a portfolio. It is also the whole difference between software people tolerate and software people trust.",
    ],
  },

  lookingAhead: {
    heading: "Looking ahead",
    body: [
      "I want to keep working on products that stay honest. Tools that show where an answer came from, say so when they are not sure, and leave the final call to the person using them.",
      "A lot of what is being built right now does the opposite, and it will take people a while to tell the two apart. I would rather spend my time on the side that makes that easy to see.",
    ],
  },
};

/**
 * Photographs for the interests marquee, from the "for about us" folder.
 * Mixed portrait and landscape on purpose: the marquee gives every frame the
 * same height and lets the width fall where it does, so nothing gets cropped.
 *
 * To swap any of them out, replace the file in public/images/about/ and run
 * `python3 scripts/gen-media-sizes.py`.
 */
export const inspirationImages = [
  {
    src: "/images/about/inspiration-01-flags.webp",
    alt: "Prayer flags strung from a temple finial against an open sky",
  },
  {
    src: "/images/about/inspiration-02-mirror.webp",
    alt: "A convex traffic mirror on a street corner, reflecting the buildings behind it",
  },
  {
    src: "/images/about/inspiration-03-dog.webp",
    alt: "A ginger street dog asleep on a sunlit step",
  },
  {
    src: "/images/about/inspiration-04-street.webp",
    alt: "A narrow street lined with old painted buildings",
  },
  {
    src: "/images/about/inspiration-05-mountains.webp",
    alt: "Mountains rising above a bank of cloud",
  },
  {
    src: "/images/about/inspiration-06-caves.webp",
    alt: "Carved stone facades at a rock-cut cave temple",
  },
  {
    src: "/images/about/inspiration-07-ghats.webp",
    alt: "Stone ghats and temple buildings along a river",
  },
  {
    src: "/images/about/inspiration-08-monkeys.webp",
    alt: "Two monkeys sitting on a wall above the rooftops",
  },
];
