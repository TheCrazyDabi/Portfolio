# Portfolio UI Fix Notes

This pass targets the layout problems visible in the supplied screenshot.

## Changes made
- Chibi companion dialogue now starts closed so it does not cover the hero portrait or introduction. Visitors can open it by interacting with the character.
- Reduced the floating chibi footprint so it behaves like a companion rather than a second hero element.
- Cropped composite pose images that contained two side-by-side chibi stickers, so the companion shows one character per state.
- Gave the fixed header more breathing room above the hero headline.
- Made the full desktop navigation appear only at extra-wide breakpoints; the mobile/tablet menu remains available until then.
- Removed the duplicate ambient-audio control from the navbar, keeping the floating controller as the single audio entry point.
- Added scroll offset handling for fixed navigation and mobile-safe companion sizing.
- Added reduced-motion handling for the chibi-specific animations.

## Validation note
The source was inspected and the visible layout issues were addressed. Dependency installation did not finish within the available execution window, so a fresh production build could not be verified in this environment. Run `npm ci` followed by `npm run build` locally or in Antigravity before deployment.

## Before publishing
- Confirm project descriptions, certifications, research affiliations, and numerical results are accurate and supportable.
- Review the admin authentication path. A frontend-only local session fallback is not secure for a public admin console; use real server-side authentication or disable the local fallback before public use.
- Confirm all `.env` values are placeholders and never commit real secrets.
