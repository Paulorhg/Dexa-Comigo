exports.up = function(knex) {
    return knex.schema.createTable('preferences', function(table){
        table.increments('id');

        table.string('user_id').notNullable();
        table.integer('item_id').notNullable();
        table.integer('amount').notNullable();
  
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('item_id').references('id').inTable('itens');
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('preferences');
  };