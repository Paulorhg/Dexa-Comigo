exports.up = function(knex) {
    return knex.schema.createTable('friend', function(table){
      table.increments('id');

      table.string('user1_id').notNullable();
      table.string('user2_id').notNullable();

      table.foreign('user1_id').references('id').inTable('users');
      table.foreign('user2_id').references('id').inTable('users');
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('friend');
  };
