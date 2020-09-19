# Code Review

## Identified Problems / Proposed Improvements

 1. Excessive implements OnInit in `libs/books/feature/src/lib/total-count/total-count.component.ts`. **FIXED**
 2. Remove empty SASS file `libs/books/feature/src/lib/total-count/total-count.component.scss`, disassociate from component declaration. **FIXED**
 3. Ability to clear search results. To help quickly clear an existing search input. **SOLVED**
 4. Hide book meta-data when unavailable (authors, publisher, etc). To hide labels when no data is available. **SOLVED**
 5. Error handling is not exposed to the user, error in google books api proxy simply results in an empty page. **SOLVED**
 6. Responsive display results books grid. To help alleviate the density of content on narrow displays.
 7. Show loading indicator when search is occurring. **SOLVED**

## Accessibility Issues

### Lighthouse

1. Buttons do not have an accessible name
2. Background and foreground colors do not have a sufficient contrast ratio.

### Manual

1. Custom controls have ARIA roles: Added aria roles to input elements, add roles (`aria-label`, `aria-labelledby`) to inputs.
2. Interactive controls are keyboard focusable: Fixed using `tabindex` plus enter key interaction.
3. The page has a logical tab order: Set a logical `tabindex`.
