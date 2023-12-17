import {integer, pgEnum, pgTable, serial, text, timestamp, varchar, numeric, date} from "drizzle-orm/pg-core"


export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  created_at: date("created_at").notNull().defaultNow(),
  title: text("title").notNull(),
  disease: text("disease").notNull(),
})

export const samples = pgTable("samples", {
    id: serial("id").primaryKey(),
    collection_id: integer("collection_id").references(()=>collections.id).notNull(),
    donor_count: numeric("donor_count").notNull(),
    material_type: text("material_type").notNull(),
    last_updated: date("last_updated").notNull().defaultNow(),
})
