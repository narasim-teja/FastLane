import { text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { createTable } from "./table-creator";

export const waitlist = createTable(
  "waitlist",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
  })
);

// export const room = createTable(
//   "room",
//   {
//     id: text("id").primaryKey(),
//     name: text("name").notNull(),
//     address: text("address").notNull(),
//     createdAt: timestamp("created_at").defaultNow(),
//     updatedAt: timestamp("updated_at", {
//       mode: "date",
//       precision: 3,
//     }).$onUpdate(() => new Date()),
//   },
//   (table) => ({
//     nameIdx: uniqueIndex("name_idx").on(table.name),
//   })
// );
