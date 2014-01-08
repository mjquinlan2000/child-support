class MoveIsSubtracted < ActiveRecord::Migration
  def up
    add_column :client_records, :is_subtracted, :boolean, default: true, null: false
    add_column :client_records, :name, :string
    remove_column :client_records, :record_type_id
    drop_table :record_types
  end

  def down
    remove_column :client_records, :is_subtracted
    remove_column :client_records, :name
    add_column :client_records, :record_type_id, :integer

    create_table :record_types do |t|
      t.string :name
      t.boolean :is_monetary, default: true, null: false
      t.boolean :is_subtracted, default: true, null: false
    end
  end
end
