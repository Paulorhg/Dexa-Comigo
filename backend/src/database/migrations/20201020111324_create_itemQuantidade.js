exports.up = function(knex) {
    return knex.schema.createTable('itemQuantidade', function(table){
      table.increments('id');

      table.integer('guest_id').notNullable();
      table.integer('item_id').notNullable();
      table.integer('amount').notNullable();

      table.foreign('guest_id').references('id').inTable('guests');
      table.foreign('item_id').references('id').inTable('itens');
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('itemQuantidade');
  };