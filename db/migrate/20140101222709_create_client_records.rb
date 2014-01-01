class CreateClientRecords < ActiveRecord::Migration
  def change
    create_table :client_records do |t|
      t.integer :record_type_id
      t.float :amount
      t.boolean :is_subtracted

      t.timestamps
    end
  end
end
