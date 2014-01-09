class ReaddRecordTypes < ActiveRecord::Migration
  def up
    create_table :record_types do |t|
      t.string :name

      t.timestamps
    end

    add_column :client_records, :record_type_id, :integer
    remove_column :client_records, :name
  end

  def down
    drop_table :record_types
    remove_column :client_records, :record_type_id
    add_column :client_records, :name, :string
  end
end
