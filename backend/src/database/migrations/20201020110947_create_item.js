exports.up = function(knex) {
    return knex.schema.createTable('itens', function(table){
      table.increments('id');
      table.string('name').notNullable();
      table.decimal('value').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('itens');
  };