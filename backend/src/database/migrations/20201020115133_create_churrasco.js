exports.up = function(knex) {
    return knex.schema.createTable('churrascos', function(table){
      table.string('id');

      table.date('date').notNullable();
      table.string('owner').notNullable();

      table.foreign('owner').references('id').inTable('users');
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('churrascos');
  };
