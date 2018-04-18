exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('outlines', function(table) {
      table.string('genre');
      table.string('setting');
      table.string('main_character_name');
      table.string('main_character_description');
      table.string('main_conflict');
      table.string('theme');
      table.string('beginning');
      table.string('middle');
      table.string('ending');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').primary();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('outlines'),
  ]);
};
