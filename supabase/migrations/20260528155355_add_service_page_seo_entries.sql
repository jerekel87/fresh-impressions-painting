/*
  # Add SEO entries for individual service pages

  1. Changes
    - Inserts SEO settings rows for each individual service page
    - Uses service slug as the page identifier (e.g., 'service:interior-painting')
    - Allows per-service SEO customization

  2. Notes
    - Each service page gets its own title, description, keywords for search engines
    - Page identifiers prefixed with 'service:' to distinguish from site pages
*/

INSERT INTO seo_settings (page, title, description, keywords, robots) VALUES
  ('service:brick-and-stone-lime-wash', 'Brick & Stone Lime Wash | Fresh Impressions Painting', 'Professional limewash and mineral finishes for brick and stone surfaces. Breathable, timeless coatings that last 15-25 years. Serving Granbury, TX and surrounding areas.', 'limewash brick, lime wash painting, mineral coating brick, masonry painting, brick painting Granbury TX, stone lime wash', 'index, follow'),
  ('service:interior-painting', 'Interior Painting Services | Fresh Impressions Painting', 'Expert interior painting for homes in Granbury, TX. Premium paints, full protection, walls, ceilings, trim, and doors. Free estimates available.', 'interior painting, house painter Granbury TX, interior house painting, wall painting, ceiling painting, trim painting', 'index, follow'),
  ('service:exterior-painting', 'Exterior Painting Services | Fresh Impressions Painting', 'Professional exterior painting that protects and beautifies your home. Power washing, surface prep, premium coatings. Serving Granbury, TX and surrounding counties.', 'exterior painting, house painting Granbury TX, exterior house painter, siding painting, trim painting exterior', 'index, follow'),
  ('service:cabinet-finishing-and-refinishing', 'Cabinet Finishing & Refinishing | Fresh Impressions Painting', 'Transform your kitchen cabinets with professional refinishing. Factory-smooth spray finish, cabinet-grade enamel coatings. Granbury, TX area.', 'cabinet painting, cabinet refinishing, kitchen cabinet painter, cabinet spray finish, cabinet painting Granbury TX', 'index, follow'),
  ('service:commercial-painting', 'Commercial Painting Services | Fresh Impressions Painting', 'Professional commercial painting for offices, retail, and industrial spaces. After-hours scheduling, minimal disruption. Granbury, TX and surrounding areas.', 'commercial painting, office painting, retail painting, commercial painter Granbury TX, business painting contractor', 'index, follow'),
  ('service:drywall-repair-and-finishing', 'Drywall Repair & Finishing | Fresh Impressions Painting', 'Expert drywall repair and finishing services. Seamless texture matching, dust-controlled sanding. Invisible repairs in Granbury, TX area.', 'drywall repair, drywall finishing, texture matching, wall repair Granbury TX, drywall patching', 'index, follow'),
  ('service:metal-finishing-and-refinishing', 'Metal Finishing & Refinishing | Fresh Impressions Painting', 'Durable coatings for metal fences, railings, gates, and steel structures. Rust removal, industrial-grade finishes. Granbury, TX and surrounding areas.', 'metal painting, metal refinishing, fence painting, railing painting, rust removal Granbury TX, gate painting', 'index, follow'),
  ('service:new-construction-painting', 'New Construction Painting | Fresh Impressions Painting', 'Complete new construction painting for builders and contractors. Interior and exterior, on schedule, move-in ready quality. Granbury, TX area.', 'new construction painting, builder painting contractor, new home painting, construction painter Granbury TX', 'index, follow'),
  ('service:staining', 'Interior & Exterior Staining | Fresh Impressions Painting', 'Professional wood staining for doors, decks, beams, and posts. UV-protective finishes that preserve natural beauty. Granbury, TX and surrounding areas.', 'wood staining, deck staining, door staining, exterior stain Granbury TX, wood finishing, beam staining', 'index, follow')
ON CONFLICT (page) DO NOTHING;
