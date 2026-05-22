import interiorPainting1 from '../assets/interior-painting1.jpg';
import interiorPainting2 from '../assets/interior-painting2.jpg';
import photoJul28a from '../assets/Photo_Jul_28_2023,_3_03_54_PM.jpg';
import photoJul28b from '../assets/Photo_Jul_28_2023,_3_05_30_PM.jpg';
import photoJun28 from '../assets/Photo_Jun_28_2019,_3_36_49_PM.jpg';
import photoAug26 from '../assets/Photo_Aug_26_2024,_8_24_29_AM.jpg';
import photoDec28 from '../assets/Photo_Dec_28_2023,_11_08_29_AM.jpg';
import photoJul15 from '../assets/Photo_Jul_15_2020,_2_24_07_PM.jpg';
import photoNov17 from '../assets/Photo_Nov_17_2022,_2_30_09_PM.jpg';
import photoNov28 from '../assets/Photo_Nov_28_2022,_1_00_42_PM.jpg';
import photoDec05 from '../assets/Photo_Dec_05_2022,_4_16_16_PM.jpg';
import photoJun16 from '../assets/Photo_Jun_16_2022,_4_46_05_PM.jpg';
import photoMar19 from '../assets/Photo_Mar_19_2026,_9_28_01_PM.png';
import photoMar23 from '../assets/Photo_Mar_23_2026,_7_47_00_AM.jpg';
import photoOct03 from '../assets/Photo_Oct_03_2022,_5_11_03_PM.jpg';
import photoOct07 from '../assets/Photo_Oct_07_2022,_5_48_26_PM.jpg';
import photoSep14 from '../assets/Photo_Sep_14_2019,_7_55_32_AM.jpg';
import photoJul18 from '../assets/Photo_Jul_18_2025,_7_31_54_PM.jpg';
import photoMar13 from '../assets/Photo_Mar_13_2025,_7_14_48_PM.jpg';
import screenshotCommercial1 from '../assets/Screenshot_2026-05-22_at_7.00.16_PM.png';
import screenshotCommercial2 from '../assets/Screenshot_2026-05-22_at_7.01.40_PM.png';
import photoNov30 from '../assets/Photo_Nov_30_2018,_3_20_20_PM.jpg';
import photoFeb23 from '../assets/Photo_Feb_23_2022,_11_05_01_AM.jpg';
import screenshotDrywall from '../assets/Screenshot_2026-05-22_at_7.11.56_PM.png';
import photoJun28_2024 from '../assets/Photo_Jun_28_2024,_3_30_16_PM.jpg';
import photoAug19 from '../assets/Photo_Aug_19_2024,_10_17_59_AM.jpg';
import photoApr08 from '../assets/Photo_Apr_08_2026,_1_17_03_PM.jpg';
import photoAug04 from '../assets/Photo_Aug_04_2023,_10_13_49_AM.jpg';
import screenshotMetal1 from '../assets/Screenshot_2026-05-22_at_8.56.25_PM.png';
import screenshotMetal2 from '../assets/Screenshot_2026-05-22_at_8.56.37_PM.png';
import photoOct26_38 from '../assets/Photo_Oct_26_2021,_1_38_18_PM.jpg';
import photoJul16_09 from '../assets/Photo_Jul_16_2021,_3_09_42_PM.jpg';
import photoJul16_12 from '../assets/Photo_Jul_16_2021,_3_12_27_PM.jpg';
import photoJul16_12b from '../assets/Photo_Jul_16_2021,_3_12_49_PM.jpg';
import photoOct26_16 from '../assets/Photo_Oct_26_2021,_1_37_16_PM.jpg';
import photoDec21 from '../assets/Photo_Dec_21_2025,_10_20_33_AM.jpg';
import photoOct26_08 from '../assets/Photo_Oct_26_2021,_1_37_08_PM.jpg';
import photoSep28 from '../assets/Photo_Sep_28_2018,_4_01_26_PM.jpg';
import photoMar18 from '../assets/Photo_Mar_18_2019,_3_51_56_PM.jpg';
import photoMay10 from '../assets/Photo_May_10_2023,_1_48_35_PM.jpg';
import photoMar20 from '../assets/Photo_Mar_20_2026,_4_13_34_PM.jpg';
import photoMar09 from '../assets/Photo_Mar_09_2023,_2_21_17_PM.jpg';
import screenshotStain from '../assets/Screenshot_2026-05-22_at_9.33.33_PM.png';
import photoAug24 from '../assets/Photo_Aug_24_2024,_10_57_46_AM.jpg';
import photoMar27 from '../assets/Photo_Mar_27_2026,_12_55_24_PM.jpg';
import photoMar27_1 from '../assets/Photo_Mar_27_2026,_12_55_24_PM_(1).jpg';
import photoMar27_2 from '../assets/Photo_Mar_27_2026,_12_55_24_PM_(2).jpg';
import photoNov20 from '../assets/Photo_Nov_20_2023,_4_22_10_PM.jpg';
import photoAug12 from '../assets/Photo_Aug_12_2025,_8_13_06_AM.jpg';
import photoAug29 from '../assets/Photo_Aug_29_2025,_5_26_28_PM.jpg';
import photoMay31 from '../assets/Photo_May_31_2024,_3_18_37_PM.jpg';
import photoFeb27 from '../assets/Photo_Feb_27_2026,_3_40_59_PM.jpg';

export interface ServiceData {
  title: string;
  slug: string;
  tagline: string;
  aboutTitle: string;
  heroImage: string;
  galleryImages: string[];
  description: string[];
  highlights: { label: string; value: string }[];
  process: { step: string; title: string; body: string }[];
  beforeAfter: { before: string; after: string; caption: string }[];
  faqs: { q: string; a: string }[];
}

export const services: Record<string, ServiceData> = {
  'brick-and-stone-lime-wash': {
    title: 'Brick and Stone Lime Wash',
    slug: 'brick-and-stone-lime-wash',
    tagline: 'Breathable, timeless finishes that add character and charm to masonry surfaces.',
    aboutTitle: 'The right way to refresh masonry.',
    heroImage: photoJun16,
    galleryImages: [
      photoJun16,
      photoMar19,
      photoMar23,
      photoJun16,
      photoMar19,
      photoMar23,
      photoJun16,
      photoMar19,
      photoMar23,
      photoJun16,
      photoMar19,
      photoMar23,
    ],
    description: [
      'If you want to update the look of your brick or masonry home, there is a better option than traditional paint. At Fresh Impressions Painting, we offer limewash and mineral-based finishes that allow masonry to breathe naturally while creating stunning curb appeal. Unlike many paints that can trap moisture and eventually peel, mineral coatings bond with the surface and age beautifully.',
      'Choose a solid mineral finish for a soft matte appearance or a classic limewash look that reveals natural variation and timeless character. It is one of the most beautiful ways to refresh brick and stone the right way.',
    ],
    highlights: [
      { label: 'Surface Type', value: 'Brick, Stone and Masonry' },
      { label: 'Finish Style', value: 'Limewash or Mineral Coat' },
      { label: 'Breathability', value: 'Fully Breathable' },
      { label: 'Durability', value: '15\u201325 Years' },
    ],
    process: [
      { step: '01', title: 'Surface Inspection', body: 'We assess the masonry condition, check for efflorescence, cracks, or moisture issues that need addressing before any finish is applied.' },
      { step: '02', title: 'Cleaning and Prep', body: 'The surface is pressure washed and dried completely. Any cracks or voids are repaired so the finish bonds evenly across the entire facade.' },
      { step: '03', title: 'Color Consultation', body: 'We work with you to select the right tone and technique \u2014 whether a heavily washed antique look or a clean, modern mineral finish.' },
      { step: '04', title: 'Application', body: 'Limewash or mineral coating is applied by hand using brushes and controlled dilution techniques to achieve the exact look and coverage desired.' },
      { step: '05', title: 'Final Walkthrough', body: 'We walk the project with you to ensure every detail meets your expectations before we pack up and leave.' },
    ],
    beforeAfter: [
      { before: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Traditional red brick transformed with classic limewash' },
      { before: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Dark stone facade refreshed with mineral white coating' },
      { before: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Aged brick exterior given new life with soft white wash' },
      { before: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/2724745/pexels-photo-2724745.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Chimney and accent wall unified with mineral finish' },
      { before: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Ranch-style home transformed with full exterior limewash' },
      { before: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Modern home with limewash accent wall feature' },
    ],
    faqs: [
      { q: 'What is the difference between limewash and regular paint?', a: 'Limewash is a mineral-based finish made from slaked lime. It penetrates the surface rather than sitting on top, which means it allows masonry to breathe, does not trap moisture, and ages with a natural, character-filled look. Regular paint forms a film over the surface and can peel over time when moisture is present.' },
      { q: 'Can limewash be applied over painted brick?', a: 'Limewash works best on raw or previously limewashed masonry. If the brick has been painted, we will evaluate the condition and may recommend a breathable mineral paint system designed for painted surfaces instead. We will advise you honestly on the best approach.' },
      { q: 'How long does a limewash finish last?', a: 'A properly applied limewash finish can last 15 to 25 years or more. Because it becomes part of the masonry rather than a coating on top of it, it does not peel or chip. It simply weathers gracefully over time.' },
      { q: 'Will it look the same across the whole surface?', a: 'Limewash is intentionally varied in appearance \u2014 that is part of its charm. Each brick absorbs slightly differently, creating organic depth and texture. If you prefer a more uniform look, we offer solid mineral finishes that provide a cleaner, more consistent result while still breathing naturally.' },
      { q: 'How do I maintain a limewashed surface?', a: 'Limewash requires very little maintenance. Occasional rinsing with water is sufficient for cleaning. If desired, a second coat can be applied years down the road to refresh the look. Avoid harsh chemical cleaners as they can break down the finish prematurely.' },
      { q: 'Is limewash only available in white?', a: 'No. While white and off-white tones are the most traditional, limewash and mineral coatings can be tinted to a wide range of muted, earthy tones. We work with you during the color consultation to find the right shade for your home.' },
    ],
  },

  'interior-painting': {
    title: 'Interior Painting',
    slug: 'interior-painting',
    tagline: 'Fresh, comfortable spaces that reflect your style and stand the test of daily life.',
    aboutTitle: 'More than paint on a wall.',
    heroImage: interiorPainting1,
    galleryImages: [
      interiorPainting1,
      interiorPainting2,
      photoJul28a,
      photoJul28b,
      photoJun28,
      photoAug26,
    ],
    description: [
      'Your home should feel fresh, comfortable, and cared for\u2014and that is exactly what we help create at Fresh Impressions Painting. We do more than apply paint. We provide a thoughtful, organized experience that respects both your home and your time.',
      'Every project begins with protecting furniture, flooring, appliances, windows, and personal belongings. We then create a room-by-room plan with you so the work flows smoothly and efficiently. From walls and ceilings to trim, doors, and detail work, we use premium products that provide beautiful color, lasting durability, and a finish you will be proud to live in every day.',
    ],
    highlights: [
      { label: 'Coverage', value: 'Walls, Ceilings, Trim and Doors' },
      { label: 'Products', value: 'Premium Grade Paints' },
      { label: 'Protection', value: 'Full Home Coverage' },
      { label: 'Finish Options', value: 'Flat to Semi-Gloss' },
    ],
    process: [
      { step: '01', title: 'Consultation and Color Selection', body: 'We meet with you in your home to discuss vision, preferences, and timeline. We help select colors and finishes that complement your spaces.' },
      { step: '02', title: 'Protection and Preparation', body: 'We thoroughly protect all furniture, flooring, fixtures, and belongings. Surfaces are cleaned, patched, sanded, and primed as needed.' },
      { step: '03', title: 'Priming', body: 'Where required, we apply premium primer to ensure proper adhesion, uniform color, and maximum durability of the topcoat.' },
      { step: '04', title: 'Painting', body: 'We apply two coats of premium paint using brushes, rollers, and spray equipment as appropriate for each surface and finish type.' },
      { step: '05', title: 'Detail Work and Touch-ups', body: 'All trim, doors, and edges are carefully cut in. We inspect every surface and address any imperfections before final walkthrough.' },
    ],
    beforeAfter: [
      { before: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Living room refreshed with modern neutral tones' },
      { before: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Bedroom walls updated with soft, warm palette' },
      { before: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Kitchen given a clean, bright transformation' },
      { before: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/2098913/pexels-photo-2098913.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Hallway and trim repainted for a polished look' },
    ],
    faqs: [
      { q: 'How long does an interior painting project take?', a: 'Most interior projects are completed in two to five days depending on the size and scope. We will provide a clear timeline during the estimate so you can plan around the work.' },
      { q: 'Do I need to move my furniture?', a: 'No. We handle all furniture moving and protection as part of our process. Everything is carefully covered and moved as needed, then returned to its original position when the job is complete.' },
      { q: 'What type of paint do you use?', a: 'We use premium-grade paints from trusted manufacturers known for durability, coverage, and low VOC content. We recommend specific products based on the room, surface, and desired finish.' },
      { q: 'How do I choose the right colors?', a: 'We offer color consultation as part of our service. We can provide sample boards, discuss lighting and room size, and help you find the perfect tones for your space.' },
      { q: 'Will there be a mess or strong paint smell?', a: 'We take extensive measures to protect your home and keep work areas clean. The premium paints we use are low-VOC, which means minimal odor. Most rooms can be used the same evening after painting.' },
      { q: 'Do you paint ceilings and trim too?', a: 'Yes. We paint walls, ceilings, trim, baseboards, doors, and any other interior surfaces you need refreshed. We can also do accent walls and specialty finishes.' },
    ],
  },

  'exterior-painting': {
    title: 'Exterior Painting',
    slug: 'exterior-painting',
    tagline: 'Professional coatings that protect and elevate your home\'s curb appeal for years to come.',
    aboutTitle: 'Protection that performs beautifully.',
    heroImage: photoDec05,
    galleryImages: [
      photoDec28,
      photoJul15,
      photoNov17,
      photoNov28,
      photoDec05,
    ],
    description: [
      'Your home\'s exterior is constantly exposed to sun, rain, wind, and changing temperatures. At Fresh Impressions Painting, we believe exterior painting should do more than look good\u2014it should protect your investment.',
      'Our proven process includes washing, surface preparation, repairs, caulking, priming where needed, painting, and final touch-ups. We use premium coatings chosen for durability and long-term performance. The result is an exterior that looks refreshed, stands strong against the elements, and adds lasting curb appeal to your home.',
    ],
    highlights: [
      { label: 'Coverage', value: 'Siding, Trim, Fascia and Doors' },
      { label: 'Prep Work', value: 'Wash, Repair and Caulk' },
      { label: 'Coatings', value: 'Premium Weather-Resistant' },
      { label: 'Longevity', value: '8\u201312 Years' },
    ],
    process: [
      { step: '01', title: 'Property Assessment', body: 'We walk the entire exterior of your home, noting areas of peeling, cracking, rot, or caulk failure that need to be addressed before painting.' },
      { step: '02', title: 'Power Washing', body: 'All surfaces are thoroughly cleaned to remove dirt, mildew, and loose paint. This ensures maximum adhesion for the new coating.' },
      { step: '03', title: 'Repairs and Prep', body: 'We scrape loose paint, fill cracks, replace rotted wood, re-caulk joints, and sand surfaces smooth. All landscaping and fixtures are protected.' },
      { step: '04', title: 'Priming and Painting', body: 'Bare and repaired areas are primed. We then apply two coats of premium exterior paint by brush, roller, and spray as appropriate for each surface.' },
      { step: '05', title: 'Final Inspection', body: 'We perform a detailed walkthrough of every surface to ensure complete coverage, clean lines, and your total satisfaction.' },
    ],
    beforeAfter: [
      { before: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Faded exterior revitalized with fresh premium coating' },
      { before: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Complete exterior transformation with modern colors' },
      { before: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Weathered siding restored to like-new condition' },
      { before: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', after: 'https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', caption: 'Trim and fascia detailed for a crisp, finished look' },
    ],
    faqs: [
      { q: 'How long does exterior paint last?', a: 'A properly prepared and painted exterior typically lasts 8 to 12 years depending on climate exposure, surface type, and coating quality. Our premium products and thorough preparation help maximize longevity.' },
      { q: 'Do you paint in all weather?', a: 'We schedule exterior work during appropriate weather conditions \u2014 generally above 50 degrees and without rain in the forecast. We monitor conditions closely and will adjust the schedule to protect quality.' },
      { q: 'What kind of prep work is involved?', a: 'We power wash, scrape loose paint, sand, fill cracks, replace damaged wood, and re-caulk all joints and seams. Proper preparation is the foundation of a long-lasting paint job.' },
      { q: 'Can you match my existing color or help me choose a new one?', a: 'Absolutely. We can match any existing color or provide consultation to help you select a new palette that complements your home, roof, and landscape.' },
      { q: 'Will you protect my landscaping?', a: 'Yes. We use drop cloths and protective coverings over all landscaping, walkways, and outdoor fixtures. We treat your property with the same care as our own.' },
      { q: 'Do you paint gutters, shutters, and front doors?', a: 'Yes. We paint all exterior surfaces including siding, trim, fascia, soffits, gutters, shutters, front doors, garage doors, and any other painted surface.' },
    ],
  },

  'cabinet-finishing-and-refinishing': {
    title: 'Cabinet Finishing And Refinishing',
    slug: 'cabinet-finishing-and-refinishing',
    tagline: 'Expert refinishing that gives your kitchen a stunning, like-new transformation.',
    aboutTitle: 'Built for beauty and daily use.',
    heroImage: photoFeb27,
    galleryImages: [
      photoAug29,
      photoAug12,
      photoFeb27,
      photoMar27_1,
      photoMar27_2,
      photoMar27,
      photoMay31,
      photoNov20,
      photoAug29,
      photoAug12,
      photoFeb27,
      photoMar27_1,
    ],
    description: [
      'Cabinets are one of the most used surfaces in any home, which means they require more than ordinary paint. At Fresh Impressions Painting, we specialize in cabinet refinishing built around two priorities: beauty and durability.',
      'Our process includes detailed cleaning, sanding, surface preparation, priming, and the use of professional cabinet-grade coatings designed to resist wear, moisture, cleaning, and daily handling. We also use specialized spray equipment to create a smooth, factory-like finish with elegant sheen options. Whether you want a bright modern kitchen or a warm timeless look, we can transform your cabinets for a fraction of replacement cost\u2014without compromising quality.',
    ],
    highlights: [
      { label: 'Surface Type', value: 'Wood, MDF and Laminate' },
      { label: 'Finish Quality', value: 'Factory-Smooth Spray' },
      { label: 'Coating Type', value: 'Cabinet-Grade Enamel' },
      { label: 'Durability', value: 'Wear and Moisture Resistant' },
    ],
    process: [
      { step: '01', title: 'Assessment and Planning', body: 'We evaluate your cabinet construction, condition, and discuss color and sheen preferences. We plan the workflow to minimize disruption to your kitchen.' },
      { step: '02', title: 'Removal and Labeling', body: 'All doors, drawers, and hardware are carefully removed and labeled. This ensures a flawless finish on every surface and easy reassembly.' },
      { step: '03', title: 'Cleaning and Sanding', body: 'Every surface is degreased, cleaned, and sanded to create the ideal bonding profile. This step is critical for long-lasting adhesion.' },
      { step: '04', title: 'Priming and Spraying', body: 'A bonding primer is applied followed by multiple coats of cabinet-grade enamel using professional spray equipment for a smooth, even finish.' },
      { step: '05', title: 'Reassembly and Inspection', body: 'Once cured, all doors, drawers, and hardware are reinstalled. We inspect every detail and ensure alignment, smooth operation, and a flawless look.' },
    ],
    beforeAfter: [
      { before: photoAug29, after: photoNov20, caption: 'Kitchen cabinets refinished in crisp white enamel' },
      { before: photoAug12, after: photoFeb27, caption: 'Modern kitchen with two-tone cabinet finishing' },
      { before: photoMar27_2, after: photoMar27, caption: 'Custom built-in cabinetry with bold color finish' },
      { before: photoMay31, after: photoMar27_1, caption: 'Pantry cabinets and shelving finished to match' },
    ],
    faqs: [
      { q: 'How long does cabinet refinishing take?', a: 'Most kitchen cabinet projects take 5 to 8 working days. This includes removal, preparation, multiple coats with proper curing time, and reinstallation. We work to minimize the time your kitchen is out of service.' },
      { q: 'Is refinishing as durable as new cabinets?', a: 'When done properly with the right products and process, refinished cabinets are extremely durable. The cabinet-grade coatings we use are specifically designed to handle daily wear, moisture, and cleaning.' },
      { q: 'Can you refinish laminate cabinets?', a: 'Yes. With proper preparation and bonding primers designed for slick surfaces, laminate cabinets can be refinished beautifully. We evaluate the condition first to confirm they are good candidates.' },
      { q: 'Will the paint chip or peel?', a: 'Our process is specifically designed to prevent this. Proper cleaning, sanding, priming, and the use of cabinet-grade coatings create a bond that resists chipping and peeling under normal use.' },
      { q: 'What sheen options are available?', a: 'We offer matte, satin, and semi-gloss sheens for cabinets. Satin is the most popular choice as it provides a subtle sheen that is easy to clean while hiding minor imperfections.' },
      { q: 'How much can I save compared to replacement?', a: 'Cabinet refinishing typically costs 40 to 60 percent less than full replacement. You get a completely transformed look and professional-grade durability without the expense and disruption of a full remodel.' },
    ],
  },

  'commercial-painting': {
    title: 'Commercial Painting',
    slug: 'commercial-painting',
    tagline: 'Professional solutions for offices and retail \u2014 minimal disruption guaranteed.',
    aboutTitle: 'Your space is your brand.',
    heroImage: photoMar13,
    galleryImages: [
      photoJul18,
      screenshotCommercial1,
      photoMar13,
      photoOct03,
      photoOct07,
      photoSep14,
      screenshotCommercial2,
      photoJul18,
      screenshotCommercial1,
      photoMar13,
      photoOct03,
      photoOct07,
    ],
    description: [
      'At Fresh Impressions Painting, we understand that the appearance of your business directly affects how customers see your brand. A clean, sharp, professional environment builds trust before a word is ever spoken.',
      'We provide interior and exterior commercial painting for offices, retail stores, restaurants, warehouses, and more. Whether your project requires after-hours scheduling, careful coordination around employees and customers, or specialized equipment such as scissor lifts and boom lifts, we are prepared to handle it professionally. Our goal is simple: deliver beautiful, durable results with minimal disruption so you can stay focused on running your business.',
    ],
    highlights: [
      { label: 'Scheduling', value: 'After-Hours Available' },
      { label: 'Equipment', value: 'Lifts and Spray Systems' },
      { label: 'Property Types', value: 'Office, Retail and Industrial' },
      { label: 'Disruption', value: 'Minimal to None' },
    ],
    process: [
      { step: '01', title: 'Site Evaluation', body: 'We assess the property, discuss your timeline and operational needs, and develop a plan that minimizes disruption to your business.' },
      { step: '02', title: 'Scheduling and Coordination', body: 'We work around your business hours \u2014 evenings, weekends, or phased sections \u2014 to keep your operation running smoothly throughout the project.' },
      { step: '03', title: 'Surface Preparation', body: 'All surfaces are cleaned, patched, and prepped. Equipment and fixtures are protected. We maintain a clean, organized workspace throughout.' },
      { step: '04', title: 'Application', body: 'Using professional spray systems and traditional methods as appropriate, we apply durable commercial-grade coatings for a clean, uniform finish.' },
      { step: '05', title: 'Final Walkthrough', body: 'We inspect every surface with your property manager or owner to ensure the work meets professional standards and your expectations.' },
    ],
    beforeAfter: [
      { before: photoOct03, after: photoOct07, caption: 'Office space refreshed with clean, professional tones' },
      { before: photoJul18, after: screenshotCommercial1, caption: 'Church sanctuary repainted for a modern worship environment' },
      { before: photoSep14, after: screenshotCommercial2, caption: 'Commercial building exterior updated with bold new colors' },
      { before: photoMar13, after: photoJul18, caption: 'New construction commercial painting' },
    ],
    faqs: [
      { q: 'Can you work after business hours?', a: 'Yes. We regularly schedule commercial work for evenings, nights, and weekends to avoid disrupting your customers and employees. We coordinate closely with you to find the ideal schedule.' },
      { q: 'Do you handle large commercial projects?', a: 'Yes. We have the equipment, crew, and experience to handle projects of all sizes \u2014 from single offices to multi-story commercial buildings. We use scissor lifts, boom lifts, and spray systems as needed.' },
      { q: 'How do you minimize disruption?', a: 'We work in sections, protect all surfaces and equipment, maintain clean work areas, and schedule around your busiest times. Most clients tell us they barely noticed we were there.' },
      { q: 'What types of businesses do you paint?', a: 'We serve offices, retail stores, restaurants, medical facilities, warehouses, churches, schools, and multi-family properties. If it has walls, we can paint it.' },
      { q: 'Are your products low-odor?', a: 'Yes. We use low-VOC, low-odor commercial coatings that are safe for occupied spaces. In most cases, the space can be used normally the same day.' },
      { q: 'Do you offer maintenance painting programs?', a: 'Yes. We work with property managers and business owners to create recurring maintenance schedules that keep properties looking sharp year-round without large one-time investments.' },
    ],
  },

  'drywall-repair-and-finishing': {
    title: 'Drywall Repair And Finishing',
    slug: 'drywall-repair-and-finishing',
    tagline: 'Seamless restoration \u2014 the invisible foundation for a flawless paint job.',
    aboutTitle: 'Repairs that disappear completely.',
    heroImage: photoNov30,
    galleryImages: [
      photoAug19,
      photoFeb23,
      screenshotDrywall,
      photoJun28_2024,
      photoNov30,
      photoAug19,
      photoFeb23,
      screenshotDrywall,
      photoJun28_2024,
      photoNov30,
      photoAug19,
      photoFeb23,
    ],
    description: [
      'Damaged drywall can make an otherwise beautiful home feel unfinished. Cracks, holes, water damage, settling seams, and poor texture repairs are common problems\u2014but they can be fixed the right way.',
      'At Fresh Impressions Painting, we focus on repairs that last, not shortcuts that fail later. We properly secure loose drywall, repair damaged areas, blend seams, and carefully match surrounding textures. Our dust-controlled sanding systems help keep your home cleaner during the process. When complete, the repair blends naturally into the wall so the damage disappears.',
    ],
    highlights: [
      { label: 'Repair Types', value: 'Cracks, Holes and Water Damage' },
      { label: 'Texture Matching', value: 'Seamless Blending' },
      { label: 'Dust Control', value: 'Vacuum Sanding Systems' },
      { label: 'Result', value: 'Invisible Repairs' },
    ],
    process: [
      { step: '01', title: 'Damage Assessment', body: 'We evaluate the extent of the damage \u2014 whether structural settling, water intrusion, impact holes, or failed tape joints \u2014 and determine the appropriate repair method.' },
      { step: '02', title: 'Securing and Repair', body: 'Loose drywall is re-secured. Damaged sections are cut out and replaced with new material. Seams are taped and mudded using professional techniques.' },
      { step: '03', title: 'Texture Matching', body: 'We carefully replicate the surrounding wall texture \u2014 whether knockdown, orange peel, smooth, or skip trowel \u2014 so the repair is invisible.' },
      { step: '04', title: 'Dust-Controlled Sanding', body: 'All joints and repairs are sanded smooth using vacuum-assisted systems that capture dust at the source, keeping your home significantly cleaner.' },
      { step: '05', title: 'Prime and Paint Ready', body: 'Repaired areas are primed to seal the surface. The wall is now ready for a flawless paint application that makes the repair completely disappear.' },
    ],
    beforeAfter: [
      { before: photoAug19, after: photoNov30, caption: 'Room prepped and repaired with seamless drywall finishing' },
      { before: photoFeb23, after: screenshotDrywall, caption: 'Crown molding area repaired with precision drywall work' },
      { before: photoJun28_2024, after: photoNov30, caption: 'Ceiling texture matched and blended after repair' },
      { before: photoAug19, after: photoFeb23, caption: 'Walls smoothed and finished for a flawless paint-ready surface' },
    ],
    faqs: [
      { q: 'Can you match my existing wall texture?', a: 'Yes. We are experienced in replicating all common textures including knockdown, orange peel, smooth, skip trowel, and others. The goal is always an invisible repair that blends seamlessly with the surrounding wall.' },
      { q: 'How messy is drywall repair?', a: 'We use dust-controlled sanding systems with vacuum attachments that capture most dust at the source. We also protect your floors and furnishings. While some dust is unavoidable, we minimize it significantly compared to traditional methods.' },
      { q: 'Should I repair drywall before painting?', a: 'Absolutely. Paint will highlight imperfections, not hide them. Repairing cracks, holes, and damaged areas before painting ensures a smooth, professional result that looks great and lasts.' },
      { q: 'Can you fix water-damaged drywall?', a: 'Yes, as long as the water source has been resolved. We remove damaged sections, treat for any mold if present, replace with new drywall, and finish to match the surrounding surface.' },
      { q: 'How long do repairs take?', a: 'Small repairs can be completed in a day. Larger jobs involving multiple rooms or significant damage may take two to four days, primarily due to drying time between coats of joint compound.' },
      { q: 'Do you also paint after repairing?', a: 'Yes. We offer complete repair-to-paint service. Once the repair is finished and primed, we can paint the affected wall or entire room so everything looks uniform and fresh.' },
    ],
  },

  'metal-finishing-and-refinishing': {
    title: 'Metal Finishing And Refinishing',
    slug: 'metal-finishing-and-refinishing',
    tagline: 'Durable coatings for metal surfaces \u2014 gates, railings, fixtures, and more.',
    aboutTitle: 'Stop rust. Extend the life.',
    heroImage: screenshotMetal1,
    galleryImages: [
      screenshotMetal1,
      screenshotMetal2,
      photoApr08,
      photoAug04,
      screenshotMetal1,
      screenshotMetal2,
      photoApr08,
      photoAug04,
      screenshotMetal1,
      screenshotMetal2,
      photoApr08,
      photoAug04,
    ],
    description: [
      'Metal surfaces such as fences, railings, gates, and structural steel need the right system to stop deterioration and extend their life.',
      'At Fresh Impressions Painting, we begin by removing loose rust and failing coatings through scraping and sanding. We then apply high-performance rust-inhibiting primers followed by industrial-grade topcoats designed to withstand harsh weather and daily exposure. This process not only improves appearance\u2014it helps preserve and protect your investment for years to come.',
    ],
    highlights: [
      { label: 'Surfaces', value: 'Fences, Rails, Gates and Steel' },
      { label: 'Prep Method', value: 'Rust Removal and Sanding' },
      { label: 'Primer', value: 'Rust-Inhibiting Formula' },
      { label: 'Topcoat', value: 'Industrial-Grade Finish' },
    ],
    process: [
      { step: '01', title: 'Condition Assessment', body: 'We inspect all metal surfaces for rust depth, coating failure, and structural integrity. This determines the appropriate level of preparation needed.' },
      { step: '02', title: 'Rust Removal and Prep', body: 'Loose rust, scale, and failed coatings are removed by scraping, wire brushing, and sanding. Surfaces are cleaned to bare or sound metal where needed.' },
      { step: '03', title: 'Rust-Inhibiting Primer', body: 'A high-performance rust-inhibiting primer is applied to seal the metal and prevent future corrosion from forming beneath the topcoat.' },
      { step: '04', title: 'Industrial Topcoat', body: 'We apply durable industrial-grade topcoats designed for exterior metal exposure. Multiple coats are used for maximum protection and appearance.' },
      { step: '05', title: 'Final Inspection', body: 'Every surface is inspected for complete coverage and coating integrity. We ensure the finish is uniform and will provide years of protection.' },
    ],
    beforeAfter: [
      { before: screenshotMetal1, after: screenshotMetal2, caption: 'Metal barn structure finished with protective industrial coating' },
      { before: photoApr08, after: photoAug04, caption: 'Iron gate refinished with durable rust-resistant finish' },
      { before: screenshotMetal2, after: screenshotMetal1, caption: 'Steel beams and roof supports coated for weather protection' },
      { before: photoAug04, after: photoApr08, caption: 'Porch railing restored with fresh protective coating' },
    ],
    faqs: [
      { q: 'How do you prepare rusted metal for painting?', a: 'We remove loose rust and failed coatings by scraping, wire brushing, and sanding. The goal is to get down to sound metal so the primer can bond properly and stop future rust from developing beneath the finish.' },
      { q: 'What kind of primer do you use on metal?', a: 'We use high-performance rust-inhibiting primers specifically designed for metal surfaces. These primers chemically bond to the metal and create a barrier that prevents moisture and oxygen from reaching the surface.' },
      { q: 'How long does a metal coating last?', a: 'With proper preparation and quality products, metal coatings can last 5 to 10 years or more depending on exposure. Regular maintenance and touch-ups can extend the life even further.' },
      { q: 'Can you paint wrought iron?', a: 'Yes. Wrought iron is one of the most common surfaces we refinish. The detailed profiles require careful hand preparation, but the results are worth it \u2014 a clean, durable finish that protects the iron for years.' },
      { q: 'Do you paint metal roofs or gutters?', a: 'Yes. We can paint and refinish metal roofing, gutters, downspouts, and other architectural metal elements using appropriate primers and coatings designed for those applications.' },
      { q: 'Is sandblasting an option?', a: 'For certain projects, we may recommend sandblasting or media blasting for the most thorough surface preparation. We evaluate each project individually and recommend the best approach for the situation.' },
    ],
  },

  'new-construction-painting': {
    title: 'New Construction Painting',
    slug: 'new-construction-painting',
    tagline: 'Complete painting solutions for new builds \u2014 from primer to final coat.',
    aboutTitle: 'On schedule. On budget. Done right.',
    heroImage: photoOct26_16,
    galleryImages: [
      photoDec21,
      photoJul16_09,
      photoJul16_12,
      photoJul16_12b,
      photoOct26_08,
      photoOct26_16,
      photoOct26_38,
      photoDec21,
      photoJul16_09,
      photoJul16_12,
      photoJul16_12b,
      photoOct26_08,
    ],
    description: [
      'New construction deserves a painting partner who understands the pace, coordination, and quality standards that builders demand. At Fresh Impressions Painting, we work hand-in-hand with builders and general contractors to deliver flawless interior and exterior finishes on schedule.',
      'From initial drywall priming through final touch-ups and punch list completion, we handle every phase of new construction painting with precision. We coordinate closely with other trades to stay on timeline, use professional spray and roll-and-brush techniques as appropriate, and deliver consistent, move-in ready results that homeowners and builders are proud of.',
    ],
    highlights: [
      { label: 'Project Scope', value: 'Full Interior and Exterior' },
      { label: 'Coordination', value: 'Multi-Trade Scheduling' },
      { label: 'Methods', value: 'Spray, Roll and Brush' },
      { label: 'Finish', value: 'Move-In Ready Quality' },
    ],
    process: [
      { step: '01', title: 'Builder Coordination', body: 'We work with the builder or GC to establish timeline, scope, color selections, and scheduling coordination with other trades on site.' },
      { step: '02', title: 'Drywall Priming', body: 'All new drywall is sealed with high-quality primer to ensure uniform topcoat absorption and a consistent finish throughout the home.' },
      { step: '03', title: 'Interior Application', body: 'Walls, ceilings, trim, doors, and closets are painted using the appropriate techniques for each surface \u2014 spray for production efficiency, cut and roll for detail areas.' },
      { step: '04', title: 'Exterior Application', body: 'Siding, trim, fascia, soffits, garage doors, and all exterior painted surfaces receive proper priming and two coats of premium exterior paint.' },
      { step: '05', title: 'Punch List and Final Touch-ups', body: 'After other trades finish and final cleanup is done, we return for a complete touch-up pass and punch list completion to ensure move-in ready quality.' },
    ],
    beforeAfter: [
      { before: photoOct26_38, after: photoDec21, caption: 'New build bonus room painted with vaulted ceiling detail' },
      { before: photoJul16_09, after: photoJul16_12, caption: 'Living area with custom built-ins painted to completion' },
      { before: photoJul16_12b, after: photoOct26_08, caption: 'New construction kitchen cabinets and walls finished' },
      { before: photoOct26_16, after: photoOct26_38, caption: 'Vaulted ceiling with exposed beams painted in new build' },
    ],
    faqs: [
      { q: 'Do you work with builders and general contractors?', a: 'Yes. We regularly partner with builders and GCs on new construction projects. We understand the pace and coordination required and work within the overall construction schedule to keep projects on time.' },
      { q: 'Can you handle multiple homes at once?', a: 'Yes. We have the crew capacity to manage multiple new construction projects simultaneously while maintaining consistent quality across all of them.' },
      { q: 'What is included in new construction painting?', a: 'Everything from drywall priming through final touch-ups \u2014 walls, ceilings, trim, doors, closets, garage, exterior siding, fascia, soffits, and all painted surfaces inside and out.' },
      { q: 'Do you spray or roll?', a: 'We use both. Spraying provides efficient, even coverage on large surfaces like walls and ceilings. Brushwork and rolling are used for detail areas, trim, and where a traditional hand-applied finish is preferred.' },
      { q: 'Do you come back for punch list items?', a: 'Absolutely. We schedule a dedicated return visit after all trades are complete and final cleaning is done to address any touch-ups, scuffs, or punch list items so the home is move-in ready.' },
      { q: 'How do you handle color selections for new builds?', a: 'We work with the builder and homeowner to finalize all color selections before work begins. We can provide guidance on coordinating interior and exterior palettes that work together cohesively.' },
    ],
  },

  'staining': {
    title: 'Interior / Exterior Staining',
    slug: 'staining',
    tagline: 'Protective finishes that preserve and beautify wood surfaces inside and out.',
    aboutTitle: 'Preserve the wood. Restore the beauty.',
    heroImage: screenshotStain,
    galleryImages: [
      screenshotStain,
      photoAug24,
      photoMar09,
      photoMar20,
      photoMay10,
      photoSep28,
      photoMar18,
      screenshotStain,
      photoAug24,
      photoMar09,
      photoMar20,
      photoMay10,
    ],
    description: [
      'Exterior wood features bring warmth and character to a home, but sun and weather can quickly dry them out and wear them down. At Fresh Impressions Painting, we restore and protect wood surfaces such as posts, shutters, front doors, beams, and decorative accents.',
      'Depending on the condition of the wood, we may recommend a maintenance coat, full stripping and re-staining, or premium clear protective finishes. Our goal is to preserve the natural beauty of the wood while helping it stand up to the elements. If your stained surfaces look tired, we can bring them back to life.',
    ],
    highlights: [
      { label: 'Surfaces', value: 'Doors, Posts, Beams and Decks' },
      { label: 'Options', value: 'Transparent to Solid Stain' },
      { label: 'Protection', value: 'UV and Weather Resistant' },
      { label: 'Application', value: 'Brush, Spray and Wipe' },
    ],
    process: [
      { step: '01', title: 'Wood Evaluation', body: 'We assess the condition of the wood \u2014 checking for gray weathering, peeling, UV damage, or rot. This determines whether maintenance coating, stripping, or replacement is needed.' },
      { step: '02', title: 'Prep and Stripping', body: 'Depending on condition, surfaces are cleaned, sanded, or fully stripped of old finish. We open the grain to accept new stain evenly.' },
      { step: '03', title: 'Stain Selection', body: 'We help you choose between transparent, semi-transparent, semi-solid, or solid stain based on the look you want and the level of protection needed.' },
      { step: '04', title: 'Application', body: 'Stain is applied by brush, spray, or wipe-on method depending on the surface type and product used. We ensure even penetration and consistent color.' },
      { step: '05', title: 'Protective Topcoat', body: 'Where appropriate, a UV-protective clear coat or sealant is applied to extend the life of the stain and shield the wood from sun and moisture.' },
    ],
    beforeAfter: [
      { before: screenshotStain, after: photoAug24, caption: 'Mahogany front door stained with rich UV-protective finish' },
      { before: photoMar09, after: photoMar20, caption: 'Wood ceiling and barn doors stained for natural warmth' },
      { before: photoMay10, after: photoSep28, caption: 'Interior beams stained to complement living space' },
      { before: photoMar18, after: photoMar09, caption: 'Floating staircase treads and handrail stained to perfection' },
    ],
    faqs: [
      { q: 'What is the difference between stain and paint for wood?', a: 'Stain penetrates the wood and enhances its natural grain and texture, while paint sits on top and covers the grain completely. Stain is ideal when you want to showcase the beauty of the wood itself.' },
      { q: 'How often does exterior stain need to be reapplied?', a: 'Depending on the product, exposure, and wood type, exterior stain typically lasts 2 to 5 years. Semi-transparent stains may need refreshing sooner, while solid stains last longer but eventually need maintenance.' },
      { q: 'Can you stain over existing stain?', a: 'In many cases, yes \u2014 especially with maintenance coats. If the existing finish is peeling or in poor condition, we may need to strip it first for proper adhesion and an even result.' },
      { q: 'Do you stain interior surfaces like trim and doors?', a: 'Yes. We stain interior woodwork including doors, trim, stair rails, mantels, and built-in shelving. Interior staining creates a warm, natural look that showcases the wood grain.' },
      { q: 'What type of stain is best for a front door?', a: 'For front doors, we typically recommend a high-quality oil-based or marine-grade stain with UV protection, followed by a clear protective topcoat. This combination provides rich color and maximum durability against sun exposure.' },
      { q: 'Can gray or weathered wood be restored?', a: 'Often, yes. If the wood is structurally sound, we can sand or strip the gray surface layer to reveal fresh wood beneath. Once clean, it accepts stain beautifully and looks new again.' },
    ],
  },
};
