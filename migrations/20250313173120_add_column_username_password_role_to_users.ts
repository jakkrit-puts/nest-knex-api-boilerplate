import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", (table) => {
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.string("role").notNullable().defaultTo("member");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("username");
        table.dropColumn("password");
        table.dropColumn("role");
    });
}

