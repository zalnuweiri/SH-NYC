// NYC-owned editorial content. Shared by the browser, Cloudflare functions and
// sitemap so an unrelated location's CMS cannot replace the rendered articles.
export const nycBlogPosts = [
  {
    id: "nyc-tacos", slug: "best-tacos-nyc", title: "Mexican Food and Tacos in NYC",
    image_url: "/redesign/fig-blog-2.png", category: "Food",
    body_text: `Mexican cooking has many regional traditions, and tacos are one part of that story. At Silent H’s upcoming NYC restaurant, our menu brings together shareable plates, grilled meats and regional cocktails.

Start with the menu

Our food menu includes guacamole quemado, tacos de chicharrón, tacos olvidados, rib-eye dishes and a 44 oz tomahawk. Read each dish’s description before ordering: a taco can pair seafood with bacon, include dairy, or use a different salsa from the one you expect.

Build a table for sharing

Choose a mix of dishes rather than several versions of the same plate. Guacamole and tostadas can sit alongside a grilled main and vegetables. Tell the team about allergies or dietary requirements before choosing your dishes.

Pair food with a cocktail

The bar menu explores flavours from different regions of Mexico. You can browse the regional cocktails, classics, margaritas and non-alcoholic options alongside the food menu. All prices on the NYC menu are in USD.

Visit Silent H NYC

Silent H is opening soon at 420 West 13th Street in the Meatpacking District. Aitch, our tequila bar, will be next door at 418 West 13th Street. Reservations are coming soon; contact info@silenthnyc.com for opening enquiries.`
  },
  {
    id: "nyc-meatpacking", slug: "meatpacking-district-restaurants", title: "Plan an Evening in the Meatpacking District",
    image_url: "/redesign/fig-blog-1.png", category: "NYC",
    body_text: `The Meatpacking District offers an easy way to combine food, art and a walk on Manhattan’s west side. Plan around the places you want to visit, then check their opening hours and booking requirements for your chosen day.

Start with art or a walk

The Whitney Museum is at 99 Gansevoort Street, near the southern entrance to the High Line. The Whitney offers free Friday admission from 5 to 10pm, with tickets required and limited capacity. Check the museum’s official ticket information before visiting. High Line hours vary by season, so confirm the park’s closing time before planning an evening walk.

Choose your dinner plans

Chelsea Market at 75 Ninth Avenue brings together food counters and shops. For a sit-down dinner, look at the menu, group size and atmosphere you want before choosing a restaurant. Opening hours and availability can change, so check directly before travelling.

Getting here

The A, C, E and L trains at 14th Street and Eighth Avenue are convenient for the neighbourhood. If you drive, check garage availability and rates before setting out. Allow time to walk between stops.

Silent H and Aitch

Silent H is opening soon at 420 West 13th Street, with a modern Mexican menu and regional cocktails. Aitch will be next door at 418 West 13th Street. Online reservations are coming soon. Follow our NYC Instagram for opening updates, or contact info@silenthnyc.com with an enquiry.`
  },
  {
    id: "nyc-events", slug: "private-dining-nyc", title: "Plan Private Dining in NYC",
    image_url: "/redesign/fig-blog-4.png", category: "Events",
    body_text: `Planning a private dinner starts with a few practical details: your date, guest count, budget and the kind of evening you want. Share those with the venue before deciding on a room or menu.

Tell us about your event

For a corporate dinner, birthday, engagement celebration or product launch, let our NYC team know whether you want a seated meal, a reception or a private gathering. Include any dietary requirements and the time you expect guests to arrive.

Confirm the space and capacity

A room’s seated capacity and reception capacity can differ. Ask which layouts are available for your guest count, whether the space is private or shared, and what accessibility arrangements you need. The NYC team will confirm the available layouts and capacity rather than relying on another venue’s figures.

Review the details before booking

Ask about the menu, minimum spend, service charges, deposits and cancellation terms. Get the agreed details in writing before making plans around them. Availability and arrangements depend on your date and party size.

Enquire with Silent H NYC

Silent H is opening soon at 420 West 13th Street. Aitch is next door at 418 West 13th Street. Email info@silenthnyc.com or call 406 282 8155 with your date and guest count. Reservations are coming soon, and private-event enquiries go directly to our NYC team.`
  },
  {
    id: "nyc-date-night", slug: "date-night-nyc", title: "A Mexican Dinner and Drinks in NYC",
    image_url: "/redesign/fig-blog-3.png", category: "Experience",
    body_text: `A dinner together can be as simple as a few shareable dishes and a good conversation. Silent H’s upcoming NYC restaurant is designed around modern Mexican food, regional cocktails and warm hospitality.

Explore the menu together

Start by browsing the food and drinks before your visit. Choose a mix of dishes you both want to try, and leave room for dessert. Our menu includes small plates, grilled mains, vegetables and cocktails inspired by Mexico.

Two spaces, two addresses

Silent H will be at 420 West 13th Street in the Meatpacking District. Next door, Aitch at 418 West 13th Street will focus on tequila, mezcal and its own cocktail menu. Aitch is a separate venue; it is not below the restaurant.

Plan around the neighbourhood

You can combine dinner with a visit to the Whitney, a walk along the High Line or time in the surrounding neighbourhood. Check opening hours, ticket requirements and travel plans before you set out.

Opening updates

Silent H and Aitch are opening soon. Reservations are coming soon too. For opening enquiries, contact info@silenthnyc.com; for Aitch, contact info@aitchnyc.com.`
  }
].map((post) => ({ ...post, status: "published", author_name: "Silent H NYC", published_at: "2026-10-07T12:00:00-04:00", updated_at: "2026-10-07T12:00:00-04:00", href: `/blogs/${post.slug}` }));

export function nycPost(slug) {
  return nycBlogPosts.find((post) => post.slug === slug) || null;
}

export function nycPostForEdge(post) {
  return post && { ...post, blog_post_content: { title: post.title, image_url: post.image_url, body_text: post.body_text } };
}
