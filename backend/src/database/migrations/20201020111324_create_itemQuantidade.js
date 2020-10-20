exports.up = function(knex) {
    return knex.schema.createTable('itemQuantidade', function(table){
      table.increments();

      table.integer('item_id').notNullable();
      table.integer('amount').notNullable();

      table.foreign('item_id').references('id').inTable('itens');
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('itemQuantidade');
  };