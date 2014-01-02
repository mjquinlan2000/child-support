class CreateClientRecords < ActiveRecord::Migration
  def change
    create_table :client_records do |t|
      t.integer :client_id, null: false
      t.integer :record_type_id
      t.float :amount

      t.timestamps
    end
  end
end
