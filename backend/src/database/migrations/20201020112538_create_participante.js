exports.up = function(knex) {
    return knex.schema.createTable('guests', function(table){
      table.increments('id');

      table.string('user_id').notNullable();
      table.string('churras_id').notNullable();
      table.bool('confirm').notNullable();

      table.foreign('user_id').references('id').inTable('users');
      table.foreign('churras_id').references('id').inTable('churrascos');
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('guests');
  };
