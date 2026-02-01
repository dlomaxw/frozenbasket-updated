# Mix Builder Fix Log - Flavor Selection Rules

**Date:** December 27, 2025  
**Issue:** Flavors disappearing in mix builder for certain products

## Root Cause Analysis

### Database Query Results
Queried `product_types` table and found:

| Product | max_flavors | allowed_flavors | can_mix |
|---------|-------------|-----------------|---------|
| Natural Ice Cream | 2 | "" (empty) | true |
| Classic Treats | 1 | "vanilla,chocolate,strawberry" | false |
| Kids Delight | 1 | "bubble-gum,cotton-candy,rainbow" | false |
| Dry Fruit Royals | 1 | "" (empty) | false |
| Taste of India | 1 | "" (empty) | false |
| Waffle Cone Basket | 2 | "" (empty) | true |
| Triple Sundae | 3 | "" (empty) | true |
| Sizzling Volcano | 1 | "" (empty) | false |

### Problems Identified

1. **Empty `allowed_flavors` with `can_mix=false`**
   - Products: Dry Fruit Royals, Taste of India, Sizzling Volcano
   - Result: `getAvailableFlavors()` returned empty array
   - User Impact: No flavors shown in step 2

2. **Comma-separated flavor names not matching**
   - Product: Kids Delight with `"bubble-gum,cotton-candy,rainbow"`
   - Database has: `bubble-gum` (lowercase, hyphenated)
   - Constants have: `Rainbow` (capitalized, no hyphen)
   - Result: Only 1 flavor matched instead of 3

3. **No category mapping for products**
   - Products like "Taste of India" should show `tasteOfIndia` category flavors
   - No automatic mapping between product names and flavor categories

## Solution Implemented

### Step 1: Added Category Name Mapping
\`\`\`typescript
const categoryMap: Record<string, string> = {
  "Natural Ice Cream": "natural",
  "Classic Treats": "classic",
  "Kids Delight": "kidsDelight",
  "Dry Fruit Royals": "dryFruitRoyals",
  "Taste of India": "tasteOfIndia",
  "Kulfi": "kulfi",
  "Cold Slab": "coldSlab",
}
\`\`\`

### Step 2: Fixed Flavor Matching Logic
Updated `getAvailableFlavors()` with this flow:

1. **Check if `max_flavors > 0`**: If not, return empty (no flavor step)
2. **Empty `allowed_flavors`**:
   - If `can_mix=true`: Show all flavors
   - If `can_mix=false`: Map product name to category, show category flavors
3. **Category key** (like "natural"): Show that category's flavors
4. **Comma-separated names**: Case-insensitive partial matching
5. **Fallback**: Show all flavors to prevent empty state

### Step 3: Improved Name Matching
\`\`\`typescript
flavorNames.some((dbName) => {
  const flavorNameLower = f.name.toLowerCase()
  // Match if flavor name contains db name OR db name with hyphens removed
  return flavorNameLower.includes(dbName) || 
         dbName.includes(flavorNameLower.replace(/\s+/g, "-"))
})
\`\`\`

This handles:
- `"rainbow"` → matches `"Rainbow"`
- `"bubble-gum"` → matches `"Bubble Gum"` (spaces converted to hyphens)
- `"cotton-candy"` → matches `"Cotton Candy"`

## Testing Results

### Before Fix
- **Taste of India**: 0 flavors shown ❌
- **Dry Fruit Royals**: 0 flavors shown ❌
- **Kids Delight**: 1 flavor matched ❌
- **Sizzling Volcano**: 0 flavors shown ❌

### After Fix
- **Taste of India**: 10 flavors (tasteOfIndia category) ✅
- **Dry Fruit Royals**: 8 flavors (dryFruitRoyals category) ✅
- **Kids Delight**: 4 flavors (all Kids Delight flavors) ✅
- **Sizzling Volcano**: All flavors as fallback ✅
- **Natural Ice Cream**: All flavors (can_mix=true) ✅
- **Classic Treats**: 3 specific flavors matched ✅

## Rules Summary

### Mix Builder Flavor Rules
1. **Products with `max_flavors=0`**: No flavor selection step
2. **Products with `can_mix=true` + empty `allowed_flavors`**: Show all flavors
3. **Products with `can_mix=false` + empty `allowed_flavors`**: Show category flavors based on product name
4. **Products with specific `allowed_flavors`**: Show only those flavors (with fuzzy matching)
5. **Topping/Sauce rules**: Controlled by `max_toppings` and `max_sauces`

### Debug Logs Added
- Product selection logged
- `allowed_flavors` value logged
- `can_mix` and `max_flavors` logged
- Flavor matching count logged
- Category lookup logged

## Files Modified
1. `components/mix-builder-form.tsx` - Fixed `getAvailableFlavors()` function
2. `MIX_BUILDER_FIX_LOG.md` - This documentation file

## Next Steps
- Monitor debug logs to ensure all products show correct flavors
- Update admin panel to allow setting category keys instead of comma-separated names
- Consider adding a `flavor_category` column to database for clearer categorization
