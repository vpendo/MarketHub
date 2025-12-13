// mockProducts have been archived. The application uses an empty product store
// by default and products should be created by an admin via the
// dashboard Product Management UI or loaded from a backend API.

import type { Product } from "../types/product";

// Minimal placeholder so deleting the data folder doesn't break imports.
export const mockProducts: Product[] = [];
